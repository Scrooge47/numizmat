import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	makeStyles,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
	Typography,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { CREATE_COIN, SIGNATURE_MUTATION } from 'src/graphql/mutations';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import AutocompleteComponent from './autocomplete';
import { GET_CURRENCIES, GET_MINTS_BY_COUNTRY } from 'src/graphql/queries';
import { Country } from 'src/schema/country';
import { Currency } from 'src/schema/currency';
import { Mint } from 'src/schema/mind';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
	},
	imageLabel: {
		borderColor: theme.palette.grey[600],
		borderStyle: 'dashed',
		cursor: 'pointer',
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
}));

interface IUploadImageResponse {
	secure_url: string;
}

enum Condition {
	G = 'Good',
	VG = 'Very good',
	F = 'Fine',
	VF = 'Very fine',
	XF = 'Extremely Fine',
	UNC = 'Uncirculated ',
}

async function uploadImage(
	image: File,
	signature: string,
	timestamp: number,
): Promise<IUploadImageResponse> {
	const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

	const formData = new FormData();
	formData.append('file', image);
	formData.append('signature', signature);
	formData.append('timestamp', timestamp.toString());
	formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_KEY ?? '');

	const response = await fetch(url, {
		method: 'post',
		body: formData,
	});
	return response.json();
}

interface defaultValues {
	country: Country | undefined;
	currency: string;
	name: string;
	denomination: number;
	year: number;
	image: FileList;
	mint: number;
	current: boolean;
	description: string;
}
interface IProps {}

const AddCoin = ({ item }: IProps) => {
	const { data: currencies, loading: loadingCurrency } = useQuery(GET_CURRENCIES);
	const [loadMints, { loading: loadingMint, data: mints }] = useLazyQuery(GET_MINTS_BY_COUNTRY, {});
	const [createSignature] = useMutation(SIGNATURE_MUTATION);
	const styles = useStyles();
	const [previewImage, setPreviewImage] = useState<string>('');
	const [createCoin] = useMutation(CREATE_COIN);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.name as string;
		console.log(event);
		console.log('name', name, event?.target?.value);
		setValue(name, name === 'current' ? event?.target?.checked : event?.target?.value);
	};

	const { register, handleSubmit, watch, errors, setValue } = useForm<defaultValues>({
		defaultValues: item ? { name: item.name, currency: item.currency.code } : {},
	});

	const onSubmit = async (data: defaultValues) => {
		if (data.image[0]) {
			const { data: signatureData } = await createSignature();
			console.log(signatureData);

			if (signatureData) {
				const { signature, timestamp } = signatureData.createImageSignature;
				const imageData = await uploadImage(data.image[0], signature, timestamp);
				const image = imageData.secure_url;
				console.log(image);

				const inputData = {
					...data,
					...{
						country: {
							connect: { code: data?.country?.code },
						},
						mint: { connect: { id: data.mint } },
						currency: { connect: { code: data.currency } },
						url: image,
						denomination: +data.denomination,
						year: +data.year,
					},
				};
				delete inputData?.image;
				delete inputData?.condition;
				console.log('input', inputData);
				const item = await createCoin({ variables: { input: inputData } });
				console.log('item', item);
			}
		}

		console.log(data);
	};

	useEffect(() => {
		//register({ name: 'country' }, { required: 'Необходимо выбрать страну' });
		register({ name: 'country' });
		register({ name: 'currency' });
		register({ name: 'current' });
		register({ name: 'mint' });
	}, []);

	const country = watch('country');
	const currency = watch('currency');
	console.log('currency', item);
	useEffect(() => {
		if (country?.code) {
			loadMints({ variables: { country: country?.code } });
		}
	}, [country]);

	if (item && loadingCurrency) return <Typography>Загружаются данные ..</Typography>;
	return (
		<>
			<Container component="main" maxWidth="sm">
				<Grid className={styles.paper} container justify="center" direction="column">
					<form onSubmit={handleSubmit(onSubmit)}>
						<Typography variant="h4" align="center">
							Добавить монету
						</Typography>

						<TextField
							margin="normal"
							variant="outlined"
							name="name"
							id="name"
							inputRef={register({ required: 'Наименование не должно быть пустым', min: 5 })}
							label="Наименование"
							fullWidth
							error={!!errors?.name}
							helperText={errors?.name?.message}
						/>
						<AutocompleteComponent
							setSelected={(value) => setValue('country', value)}
							label="Страна"
							variant="outlined"
						/>
						<FormControl fullWidth variant="outlined" margin="normal">
							<InputLabel variant="outlined" id="mint">
								Монетный двор
							</InputLabel>
							<Select
								label="Монетный двор"
								//labelId="currency"
								variant="outlined"
								//	id="currency"
								defaultValue=""
								onChange={handleChange}
								name="mint"
								inputProps={{
									id: 'select-currency',
								}}>
								{mints &&
									mints.getMints?.map((item: Mint) => (
										<MenuItem value={item.id} key={item.name}>
											{item.name}
										</MenuItem>
									))}
							</Select>
						</FormControl>
						<FormControl fullWidth variant="outlined" margin="normal">
							<InputLabel variant="outlined" id="condition">
								Состояние
							</InputLabel>
							<Select
								label="Состояние"
								variant="outlined"
								id="condition"
								native
								onChange={handleChange}
								inputRef={register}
								name="condition"
								inputProps={{
									id: 'select-condition',
								}}>
								<option value="F">{Condition.F}</option>
								<option value="UNC">{Condition.UNC}</option>
							</Select>
						</FormControl>
						<TextField
							type="number"
							margin="normal"
							variant="outlined"
							name="denomination"
							id="price"
							inputRef={register}
							label="Цена"
							fullWidth
						/>
						<TextField
							type="number"
							margin="normal"
							variant="outlined"
							name="year"
							id="year"
							inputRef={register}
							label="Год"
							fullWidth
						/>
						<FormControlLabel
							label="В обращении"
							control={
								<Checkbox
									id="current"
									name="current"
									onChange={handleChange}
									inputProps={{ 'aria-label': 'primary checkbox' }}
								/>
							}
						/>
						<FormControl fullWidth variant="outlined" margin="normal">
							<InputLabel variant="outlined" id="currency">
								Валюта
							</InputLabel>
							<Select
								label="Валюта"
								//labelId="currency"
								variant="outlined"
								//	id="currency"
								defaultValue={item?.currency?.code || ''}
								onChange={handleChange}
								name="currency"
								inputProps={{
									id: 'select-currency',
								}}>
								{currencies &&
									currencies.currencies.map((item: Currency) => (
										<MenuItem value={item.code} key={item.code}>
											{item.name}
										</MenuItem>
									))}
							</Select>
						</FormControl>
						<TextField
							margin="normal"
							variant="outlined"
							name="description"
							id="description"
							inputRef={register}
							label="Описание"
							fullWidth
							multiline
							rows={10}
						/>
						<Button component="label" className={styles.imageLabel} variant="outlined" fullWidth>
							Нажмите чтобы загрузить файл{' '}
							<input
								type="file"
								hidden
								name="image"
								ref={register}
								onChange={(event: ChangeEvent<HTMLInputElement>) => {
									console.log(event);
									if (event?.target?.files?.[0]) {
										const file = event.target.files[0];
										const fileReader = new FileReader();
										fileReader.readAsDataURL(file);
										fileReader.onload = () => {
											setPreviewImage(fileReader.result as string);
										};
									}
								}}
							/>
						</Button>
						{previewImage && (
							<Image src={previewImage} width="576px" height={`${(9 / 16) * 576}px`} />
						)}
						<Button type="submit" fullWidth variant="contained" color="primary">
							Создать
						</Button>
					</form>
				</Grid>
			</Container>
		</>
	);
};
export default AddCoin;
