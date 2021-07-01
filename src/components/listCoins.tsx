import { useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AVAILABLE_FILTERS, COINS_QUERY } from 'src/graphql/queries';
import OneCoinOfList from './oneCoinList';
import { getCoins } from 'src/generated/getCoins';
import { filters } from 'src/generated/filters';
import { useState } from 'react';
import { Model } from 'src/utils/types';
import Search from './search';
import parsefiltersForQuery from 'src/utils/parsefiltersForQuery';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxWidth: 1100,
			width: '100%',
			margin: '0 auto',
			padding: theme.spacing(6, 2),
			[theme.breakpoints.up('sm')]: {
				padding: theme.spacing(12, 2),
			},
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.secondary,
		},
	}),
);

const ListCoins = () => {
	const [chips, setChips] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const classes = useStyles();

	const { data: coinsFilters, loading: loadingCountries } = useQuery<filters>(AVAILABLE_FILTERS);

	const { data, loading } = useQuery<getCoins>(COINS_QUERY, {
		variables: {
			filters: { ...parsefiltersForQuery(Model.Coin, chips, inputValue) },
		},
	});

	return (
		<div className={classes.root}>
			<Grid item xs={12} spacing={2} className={classes.paper}>
				<Search
					filters={coinsFilters?.getFiltersFromCoins}
					chips={chips}
					setChips={setChips}
					inputValue={inputValue}
					setInputValue={setInputValue}
				/>
			</Grid>
			{/* <Filter filters={filters} /> */}
			<Grid container spacing={2} justify="space-between">
				{data?.getCoins.map((i, index: number) => (
					<Grid item xs={12} sm={6} md={4} key={i.id}>
						<OneCoinOfList item={i} key={index} />
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default ListCoins;
