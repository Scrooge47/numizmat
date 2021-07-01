import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
	useMediaQuery,
	Grid,
	Typography,
	TextField,
	Button,
	Divider,
	Card,
	CardMedia,
	CardContent,
	colors,
} from '@material-ui/core';
import { useMutation, useQuery } from '@apollo/client';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/base';
import { COLLECTION_OF_USER, AVAILABLE_FILTERS_OF_USER } from 'src/graphql/queries';
import { collection, collection_collectionOfUser_coin } from 'src/generated/collection';
import { filtersOfUser } from 'src/generated/filtersOfUser';
import {
	addCoinToCollection,
	addCoinToCollectionVariables,
} from 'src/generated/addCoinToCollection';
import { ADD_COIN_TO_COLLECTION } from 'src/graphql/mutations';
import FieldAddCoin from '../common/fieldAddCoin';
import Search from 'src/components/search';
import _ from 'lodash';
import { fill } from '@cloudinary/base/actions/resize';
import parsefiltersForQuery from 'src/utils/parsefiltersForQuery';
import { Model } from 'src/utils/types';

const useStyles = makeStyles((theme) => ({
	root: {},
	inputTitle: {
		fontWeight: 700,
		marginBottom: theme.spacing(1),
	},
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

const BlogMediaContent = ({ coin }: { coin: collection_collectionOfUser_coin }) => {
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
interface IProps {
	className?: string;
}

const MyCollection = (props: IProps) => {
	const [chips, setChips] = useState([]);
	const [inputValue, setInputValue] = useState('');

	const { loading, error, data } = useQuery<collection>(COLLECTION_OF_USER, {
		variables: {
			filters: { ...parsefiltersForQuery(Model.Collection, chips, inputValue) },
		},
	});
	const { loading: loadingFilters, data: filters } =
		useQuery<filtersOfUser>(AVAILABLE_FILTERS_OF_USER);

	const [addCoin] =
		useMutation<addCoinToCollection, addCoinToCollectionVariables>(ADD_COIN_TO_COLLECTION);

	const { className } = props;
	const classes = useStyles();

	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<div className={clsx(classes.root, className)}>
			<Grid container spacing={isMd ? 4 : 2}>
				<Grid item xs={12}>
					<Search
						filters={filters?.getFiltersFromCoinsOfUser}
						chips={chips}
						setChips={setChips}
						inputValue={inputValue}
						setInputValue={setInputValue}
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h6" color="textPrimary">
						Коллекция монет
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Divider />
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={0}>
						{data?.collectionOfUser.map((item, index) => (
							<Grid item xs={12} sm={4} key={index} className={clsx(classes.gridItem)}>
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
										<BlogMediaContent coin={item.coin} />
									</CardMedia>
									<CardContent>
										{' '}
										<BlogContent title={item.coin.name} />
									</CardContent>
									<FieldAddCoin addCoin={addCoin} item={item.coin} />
								</Card>
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default MyCollection;
