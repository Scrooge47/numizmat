import { Cloudinary } from '@cloudinary/base';
import { AdvancedImage } from '@cloudinary/react';
import {
	Card,
	CardContent,
	CardMedia,
	Grid,
	makeStyles,
	Theme,
	Typography,
	colors,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from '@material-ui/core';
import clsx from 'clsx';
import { fill } from '@cloudinary/base/actions/resize';
import FieldAddCoin from 'src/components/common/fieldAddCoin';
import { Condition, Model } from 'src/utils/types';
import { MutationFunctionOptions } from '@apollo/client';
import {
	addCoinToCollection,
	addCoinToCollectionVariables,
} from 'src/generated/addCoinToCollection';
import Favorite from 'src/components/common/favorite';

const useStyles = makeStyles((theme: Theme) => ({
	gridItem: {
		marginBottom: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		borderBottom: `1px solid ${colors.grey[200]}`,
		'&:last-child': {
			marginBottom: 0,
			borderBottom: 0,
			paddingBottom: 0,
		},
	},
	cardProduct: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		height: '100%',
		boxShadow: 'none',
		borderRadius: 0,
		'& .card-product__content': {
			padding: 0,
			paddingLeft: theme.spacing(2),
		},
		'& .card-product__media': {
			height: 90,
			width: 90,
			'& img': {
				height: 90,
				width: 90,
			},
		},
	},
	image: {
		objectFit: 'cover',
	},
	blogContent: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		height: '100%',
	},
	blogTitle: {
		fontWeight: 700,
	},
	tags: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	tag: {
		margin: theme.spacing(0, 1 / 2, 1 / 2, 0),
		textTransform: 'uppercase',
		fontWeight: 700,
	},
	sectionTitle: {
		fontWeight: 'bold',
		marginBottom: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
			marginBottom: theme.spacing(3),
		},
	},
}));

interface Coin {
	name: string;
	count: number;
	publicId: string;
	id: string;
	favorite: boolean;
	prices: [
		{
			price: number;
			condition: Condition;
			currency: {
				name: string;
			};
			count: number;
		},
	];
}

interface IProps {
	data: Coin[] | undefined;
	addCoin: (
		options?:
			| MutationFunctionOptions<addCoinToCollection, addCoinToCollectionVariables>
			| undefined,
	) => Promise<any>;
	model: Model;
}

const BlogContent = (props: { title: string }) => {
	const classes = useStyles();
	return (
		<div className={classes.blogContent}>
			{/* <div className={classes.tags}>
				{props.tags.map((item, index) => (
					<Typography variant="caption" color="primary" className={classes.tag} key={index}>
						{item}
					</Typography>
				))}
			</div> */}
			<Typography
				variant="body2"
				color="textPrimary"
				className={classes.blogTitle}
				gutterBottom
				align={'center'}>
				{props.title}
			</Typography>
			{/* <Typography variant="caption" color="textPrimary">
				<i>
					{props.author.name} - {props.date}
				</i>
			</Typography> */}
		</div>
	);
};

const BlogMediaContent = ({ coin }: { coin: Coin }) => {
	const classes = useStyles();

	// Create and configure your Cloudinary instance.
	const cld = new Cloudinary({
		cloud: {
			cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
		},
	});

	const myImage = cld.image(`numizmat/${coin.publicId}`);

	myImage.resize(
		fill()
			.width('auto')
			.height(Math.floor((9 / 16) * 250)),
	);
	return <AdvancedImage cldImg={myImage} />;
};

const ListOfCoins = ({ data, addCoin, model }: IProps) => {
	const classes = useStyles();
	return (
		<Grid item xs={12}>
			<Grid container spacing={0}>
				{data?.map((item, index) => (
					<Grid item xs={12} md={4} key={index} className={clsx(classes.gridItem)}>
						{/* <CardProduct
          className={classes.cardProduct}
          mediaContent={<BlogMediaContent {...item.cover} alt={item.title} />}
          cardContent={
            <BlogContent
              title={item.title}
              subtitle={item.subtitle}
              author={item.author}
              date={item.date}
              tags={item.tags}
            />
          }
        /> */}
						<Card className={classes.cardProduct} raised={true}>
							<CardMedia>
								<BlogMediaContent coin={item} />
							</CardMedia>
							<CardContent>
								{' '}
								<BlogContent title={item.name} />
							</CardContent>
							<FieldAddCoin
								addCoin={addCoin}
								item={item}
								model={model}
								condition={Condition.G}
								count={item.count}
							/>
							<Favorite coin={item} />
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Состояние</TableCell>
										<TableCell align="center">Цена</TableCell>
										<TableCell align="right">К-во</TableCell>
										{/* <TableCell>В</TableCell> */}
									</TableRow>
								</TableHead>
								<TableBody>
									{item.prices.map((price, index) => (
										<TableRow key={index}>
											<TableCell>{price.condition}</TableCell>
											<TableCell>{price.price}</TableCell>
											<TableCell>
												<FieldAddCoin
													addCoin={addCoin}
													item={item}
													model={model}
													condition={price.condition}
													count={price.count}
												/>
											</TableCell>
											{/* <TableCell align="right">{price.currency.name}</TableCell> */}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Card>
					</Grid>
				))}
			</Grid>
		</Grid>
	);
};

export default ListOfCoins;
