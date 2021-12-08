import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	FormControl,
	Grid,
	Input,
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@material-ui/core';
import { getCoins_getCoins, getCoins_getCoins_prices } from 'src/generated/getCoins';
import { Image, Transformation } from 'cloudinary-react';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { ADD_COIN_TO_COLLECTION } from 'src/graphql/mutations';
import {
	addCoinToCollection,
	addCoinToCollectionVariables,
} from 'src/generated/addCoinToCollection';
import FieldAddCoin from './common/fieldAddCoin';
import { Condition, Model } from 'src/utils/types';
import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Session } from 'next-auth';
import { session } from 'next-auth/client';
import { getCoinsNonAuthorized_getCoins } from 'src/generated/getCoinsNonAuthorized';

interface IProps {
	item: getCoins_getCoins | getCoinsNonAuthorized_getCoins;
	isLogIn: boolean;
}

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
		width: '100%',
		boxShadow: '0 2px 10px 0 rgba(23,70,161,.11)',
		transition: 'box-shadow .25s ease,transform .25s ease,-webkit-transform .25s ease',
		'&:hover': {
			boxShadow:
				'0 1.5rem 2.5rem rgba(22,28,45,.1),0 .3rem 0.5rem -.50rem rgba(22,28,45,.05) !important',
			transform: 'translate3d(0,-5px,0)',
		},
	},
	cardHeader: {
		textAlign: 'center',
	},
	content: {
		marginTop: '5px',
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	cardMedia: {
		textAlign: 'center',
	},
	accordionSummary: {
		backgroundColor:
			theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
		flexDirection: 'row-reverse',
		'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
			transform: 'rotate(90deg)',
		},
		'& .MuiAccordionSummary-content': {
			marginLeft: theme.spacing(1),
		},
	},
	accordion: {
		border: `1px solid ${theme.palette.divider}`,
		'&:not(:last-child)': {
			borderBottom: 0,
		},
		'&:before': {
			display: 'none',
		},
	},
}));

const addEmptyConditionInListPrices = (
	prices: getCoins_getCoins_prices[],
): getCoins_getCoins_prices[] => {
	const fullPrices: getCoins_getCoins_prices[] = [];
	for (const value in Condition) {
		const res = prices.find((i) => i.condition == value);
		if (!res) {
			fullPrices.push({
				condition: Condition[value],
				price: 0,
				count: 0,
				currency: undefined,
			});
		} else fullPrices.push(res);
	}

	return fullPrices;
};

const OneCoinOfList = ({ item, isLogIn }: IProps) => {
	const [addCoin, data] = useMutation<addCoinToCollection, addCoinToCollectionVariables>(
		ADD_COIN_TO_COLLECTION,
	);
	const classes = useStyles();
	const { prices } = item;

	const allPrices = addEmptyConditionInListPrices(prices);
	return (
		<Card className={classes.root}>
			<Typography className={classes.cardHeader} variant="h6" color="textPrimary" gutterBottom>
				{item.name}
			</Typography>
			<CardMedia className={classes.cardMedia}>
				<Image
					cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
					publicId={`numizmat/${item.publicId}`}
					secure
					dpr="auto"
					quality="auto"
					width="auto"
					height={Math.floor((9 / 16) * 250)}
					crop="fill"
					gravity="auto">
					{/* <Transformation quality="auto" fetchFormat="auto" /> */}
				</Image>
			</CardMedia>
			<CardContent>
				<Typography variant={'caption'} component="div">
					{`Номинал монеты: ${item.denomination}`}
				</Typography>
				<Typography variant={'caption'} component="div">
					{`Валюта: ${item.currency.name}`}
				</Typography>
				<Typography variant={'caption'} component="div">
					{item.current ? `В обращении` : `Не принимается`}
				</Typography>
				<Typography variant={'caption'} component="div">
					{`Тираж: ${item.circulation}`}
				</Typography>
				{/* <Typography variant="body2" color="textPrimary" className={classes.content}>
					{item.description}
				</Typography> */}
			</CardContent>
			<CardActions>
				{/* <Grid container direction="row" justify="space-between">
					<Grid item>
						<Box fontWeight="500" color="text.primary" fontSize="body2.fontSize" component="span">
							Количество монет:
						</Box>
					</Grid>
					<Grid item xs={3}>
						<TextField
							variant="outlined"
							id="standard-adornment-password"
							type="number"
							defaultValue={item.count}
							onChange={(e) =>
								addCoin({
									variables: {
										input: {
											coin: {
												connect: {
													id: item.id,
												},
											},
											count: +e.target.value,
										},
									},
								})
							}
						/>
					</Grid>
				</Grid> */}
				{/* <Button size="small">
					<Link href={`/coins/${item.id}/edit`}>Редактировать</Link>
				</Button> */}
				<Accordion className={classes.accordion}>
					<AccordionSummary
						className={classes.accordionSummary}
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header">
						<Typography>Оценка монет</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Состояние</TableCell>
									<TableCell align="right">Цена</TableCell>
									{isLogIn && <TableCell align="center">Количество</TableCell>}
									{/* <TableCell>В</TableCell> */}
								</TableRow>
							</TableHead>
							<TableBody>
								{allPrices.map((price, index) => (
									<TableRow key={index}>
										<TableCell>{price.condition}</TableCell>
										<TableCell align="right">{price.price}</TableCell>
										{isLogIn && (
											<TableCell align="center">
												<FieldAddCoin
													addCoin={addCoin}
													item={item}
													model={Model.Coin}
													condition={price.condition}
													count={price.count}
												/>
											</TableCell>
										)}
										{/* <TableCell align="right">{price.currency.name}</TableCell> */}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</AccordionDetails>
				</Accordion>
			</CardActions>
		</Card>
	);
};

export default OneCoinOfList;
