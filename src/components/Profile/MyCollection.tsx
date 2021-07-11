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
import parsefiltersForQuery from 'src/utils/parsefiltersForQuery';
import { Model } from 'src/utils/types';
import ListOfCoins from './Components/ListOfCoins';
import addCoin from 'pages/addcoin';
const useStyles = makeStyles((theme) => ({
	root: {},
	inputTitle: {
		fontWeight: 700,
		marginBottom: theme.spacing(1),
	},
}));

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

	const coins = data?.collectionOfUser.map((i) => i.coin);

	return (
		<div className={clsx(classes.root, className)}>
			<Grid container spacing={isMd ? 4 : 2} xs>
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
				<ListOfCoins data={coins} addCoin={addCoin} model={Model.Collection} />
			</Grid>
		</div>
	);
};

export default MyCollection;
