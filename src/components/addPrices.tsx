// @flow

import {
	Container,
	Grid,
	Typography,
	makeStyles,
	Theme,
	TextField,
	Button,
	FormControl,
	Select,
	InputLabel,
	CircularProgress,
} from '@material-ui/core';
import { COINS_QUERY } from 'src/graphql/queries';
import AutocompleteComponent from './autocomplete';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PRICE } from 'src/graphql/mutations';
import { addPrice, addPriceVariables, addPrice_addPrice } from 'src/generated/addPrice';
import { newPriceInput } from 'src/schema/price';
import { Alert } from '@material-ui/lab';

enum Condition {
	G = 'G',
	VG = 'VG',
	F = 'F',
	VF = 'VF',
	XF = 'XF',
	UNC = 'UNC',
	PROOF = 'PROOF',
}
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		marginTop: '50px',
	},
	buttonProgress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
	alert: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
	wrapper: {
		margin: theme.spacing(1),
		position: 'relative',
	},
}));
type Props = {};

type Inputs = {
	coin: string;
	price: string;
	currency: string;
	condition: Condition;
};

interface IFormValues {
	firstName: string;
	lastName: string;
}

const AddPricesForm = (props: Props) => {
	const classes = useStyles();
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		control,
		formState: { errors, isSubmitting },
	} = useForm();

	useEffect(() => {
		register('coin', { required: 'Выбирете монету' });
	}, []);

	const [recordError, setRecordError] = useState<boolean>(false);
	const [recordSuccess, setrecordSuccess] = useState<boolean>(false);

	const [addPrice, { loading, error }] = useMutation<{ addPrice: addPrice; input: newPriceInput }>(
		ADD_PRICE,
		{
			onError(err) {
				setRecordError(true);
			},
			errorPolicy: 'none',
		},
	);
	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		try {
			const item = await addPrice({
				variables: {
					input: {
						coinId: data.coin,
						currencyId: data.currency,
						price: parseFloat(data.price),
						condition: data.condition,
					},
				},
			});
			setrecordSuccess(true);
		} catch (e) {}
	};

	useEffect(() => {
		console.log('in use Efffect');
		if (isSubmitting) {
			setrecordSuccess(false);
			setRecordError(false);
		}
	}, [isSubmitting]);

	console.log('recordSuccess', recordSuccess);
	return (
		<div>
			<Container component="main" maxWidth="xs">
				<Grid className={classes.root} container justify="center" direction="column">
					<form onSubmit={handleSubmit(onSubmit)}>
						<Grid item xs={12}>
							<Typography variant="h4" align="center">
								Adding the prices
							</Typography>
						</Grid>
						<Grid>
							<AutocompleteComponent
								setSelected={(value) => setValue('coin', value)}
								label="Монета"
								variant="outlined"
								query={COINS_QUERY}
								search={{ filters: { name: { contains: '', mode: 'insensitive' } } }}
								pathOfInputSearch="filters.name.contains"
								pathOfData="getCoins"
								pathOfId="id"
								errors={errors}
								field="coin"
							/>
						</Grid>
						<Grid>
							<Controller
								name="currency"
								control={control}
								defaultValue="643"
								render={({ field }) => (
									<FormControl fullWidth variant="outlined" margin="normal" {...field}>
										<InputLabel variant="outlined" id="currency">
											Валюта
										</InputLabel>
										<Select
											label="Валюта"
											variant="outlined"
											id="currency"
											native
											inputProps={{
												id: 'select-currency',
											}}>
											<option value="643">Рубль</option>
											<option value="978">Евро</option>
										</Select>
									</FormControl>
								)}
							/>
						</Grid>
						<Grid>
							<Controller
								name="condition"
								control={control}
								defaultValue="G"
								render={({ field }) => (
									<FormControl fullWidth variant="outlined" margin="normal">
										<InputLabel variant="outlined" id="condition">
											Состояние
										</InputLabel>
										<Select
											label="Состояние"
											variant="outlined"
											id="condition"
											native
											name="condition"
											inputProps={{
												id: 'select-condition',
											}}>
											<option value="G">{Condition.G}</option>
											<option value="F">{Condition.F}</option>
											<option value="UNC">{Condition.UNC}</option>
											<option value="VG">{Condition.VG}</option>
											<option value="VF">{Condition.VF}</option>
											<option value="PROOF">{Condition.PROOF}</option>
										</Select>
									</FormControl>
								)}
							/>
						</Grid>
						<Grid>
							<TextField
								margin="normal"
								variant="outlined"
								id="price"
								label="Цена"
								fullWidth
								type="number"
								error={!!errors?.price}
								helperText={errors?.price?.message}
								{...register('price', { required: 'Необходимо указать стоимость' })}
							/>
						</Grid>
						<Grid className={classes.wrapper}>
							<Button
								disabled={isSubmitting}
								type="submit"
								fullWidth
								variant="contained"
								color="primary">
								Сохранить
							</Button>
							{isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
						</Grid>
					</form>
				</Grid>
				<Grid>
					{recordSuccess && <Alert severity="success">Цена успешно записана</Alert>}
					{recordError && (
						<Alert className={classes.alert} severity="error">
							Во время записи произошли ошибки
						</Alert>
					)}
				</Grid>
			</Container>
		</div>
	);
};

export default AddPricesForm;
