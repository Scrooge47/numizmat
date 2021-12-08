import { useLazyQuery, useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AVAILABLE_FILTERS, COINS_QUERY, COINS_QUERY_NON_AUTHORIZED } from 'src/graphql/queries';
import OneCoinOfList from './oneCoinList';
import { getCoins } from 'src/generated/getCoins';
import { filters } from 'src/generated/filters';
import { useEffect, useState } from 'react';
import { Model } from 'src/utils/types';
import Search from './search';
import parsefiltersForQuery from 'src/utils/parsefiltersForQuery';
import { useSession } from 'next-auth/client';
import { Session } from 'next-auth';
import { getCoinsNonAuthorized } from 'src/generated/getCoinsNonAuthorized';
import { filter } from 'lodash';

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

interface ListCoinProps {
	isLogIn: boolean;
	session?: Session;
	coins?: getCoinsNonAuthorized;
}

const ListCoins = ({ isLogIn, session, coins }: ListCoinProps) => {
	const [chips, setChips] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [collection, setCollection] = useState(coins);
	const classes = useStyles();

	const user = isLogIn ? session?.user : null;
	const queryForCoins = isLogIn ? COINS_QUERY : COINS_QUERY_NON_AUTHORIZED;
	const { data: coinsFilters, loading: loadingCountries } = useQuery<filters>(AVAILABLE_FILTERS);

	const [getCoins, { data, loading, fetchMore }] = useLazyQuery<getCoins | getCoinsNonAuthorized>(
		queryForCoins,
		// {
		// 	variables: {
		// 		filters: { ...parsefiltersForQuery(Model.Coin, chips, inputValue) },
		// 	},
		// },
	);

	useEffect(() => {
		getCoins({
			variables: {
				filters: { filter: { ...parsefiltersForQuery(Model.Coin, chips, inputValue) }, first: 2 },
			},
		});
	}, [chips, inputValue]);

	useEffect(() => {
		setCollection(data);
	}, [data]);

	let fetchMoreBlock;
	if (data) {
		if (data.getCoins.pageInfo.hasNextPage) {
			fetchMoreBlock = (
				<button
					onClick={() => {
						fetchMore({
							variables: {
								filters: {
									filter: { ...parsefiltersForQuery(Model.Coin, chips, inputValue) },
									first: 2,
									after: data.getCoins.pageInfo.endCursor,
								},
							},
							updateQuery: (prevResult, { fetchMoreResult }) => {
								fetchMoreResult.getCoins.edges = [
									...prevResult.getCoins.edges,
									...fetchMoreResult.getCoins.edges,
								];

								return fetchMoreResult;
								// return {
								// 	...prevResult,
								// 	// Add the new feed data to the end of the old feed data.
								// 	: [...previousResult.feed, ...fetchMoreResult.feed],
								//   };
							},
						});
					}}>
					more
				</button>
			);
		} else {
			fetchMoreBlock = <p> You reached the end</p>;
		}
	} else {
		fetchMoreBlock = <></>;
	}
	return (
		<div className={classes.root}>
			<Grid item xs={12} className={classes.paper}>
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
				{collection?.getCoins.edges.map((i, index: number) => (
					<Grid item xs={12} sm={6} md={4} key={i.node.id}>
						<OneCoinOfList item={i.node} key={index} isLogIn={isLogIn} />
					</Grid>
				))}
			</Grid>
			{fetchMoreBlock}
		</div>
	);
};

export default ListCoins;
