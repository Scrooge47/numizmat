import { useQuery } from '@apollo/client';

import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AVAILABLE_FILTERS, COINS_QUERY } from 'src/graphql/queries';
import OneCoinOfList from './oneCoinList';
import { getCoins } from 'src/generated/getCoins';
import { filters } from 'src/generated/filters';
import { useEffect, useState } from 'react';
import Filter from './filter';
import { Filters } from 'src/utils/types';

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

const parsefiltersForQuery = (filters: any) => {
	if (filters.country.length) {
		return {
			where: {
				country: {
					code: { in: [...filters.country] },
				},
			},
		};
	}

	return {};
};

interface Array {
	inArray(): () => boolean;
}

const ListCoins = () => {
	const classes = useStyles();
	const [filters, setFilters] = useState<Filters>({ country: [], nameCollection: [] });
	const [filtersForQuery, setFiltersForQuery] = useState({ country: [], nameCollection: [] });

	const { data: coinsFilters, loading: loadingCountries } = useQuery<filters>(AVAILABLE_FILTERS);

	const { data, loading } = useQuery<getCoins>(COINS_QUERY, {
		variables: {
			filters: { ...parsefiltersForQuery(filtersForQuery) },
		},
	});
	const [firstLoading, setFirstLoading] = useState<Boolean>(true);

	useEffect(() => setFirstLoading(false), [coinsFilters]);

	useEffect(() => {
		setFilters(() => {
			const newFilters: Filters = { country: [], nameCollection: [] };
			coinsFilters?.getFiltersFromCoins.map((i) => {
				if (
					!newFilters.country.find(
						(item) => item.code === i.country.code && i.name === i.country.name,
					)
				)
					newFilters.country.push({ name: i.country.name, code: i.country.code });
				if (
					!newFilters.nameCollection.find(
						(item) => item.code === i.nameCollection.id && item.name === i.nameCollection.name,
					)
				)
					newFilters.nameCollection.push({
						name: i.nameCollection.name,
						code: i.nameCollection.id,
					});
			});
			return newFilters;
		});
	}, [coinsFilters]);

	if (loading && firstLoading) return <>....loading</>;
	return (
		<div className={classes.root}>
			<Filter filters={filters} usedFilters={filtersForQuery} setFilteres={setFiltersForQuery} />
			{/* <Filter filters={filters} /> */}
			<Grid container spacing={1} justify="space-between">
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
