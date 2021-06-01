// @flow
import * as React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from 'src/components/common/accordion';
import { WhereFilters } from 'src/schema/coin';

import { getCountryFromCoins_getCountryFromCoins } from 'src/generated/getCountryFromCoins';
import { Filters } from 'src/utils/types';

type Props = {
	filters: Filters;
	setFilteres: React.Dispatch<React.SetStateAction<{ country: [] }>>;
	usedFilters: Filters;
};

type IItem = {
	id: string;
	title: string;
};

// const items: [IItem] = [
// 	{
// 		id: 'Country',
// 		title: 'Страны',
// 	},
// ];

const useStyles = makeStyles((theme) => ({
	root: {},
	title: {
		fontWeight: 'bold',
	},
	accordionGrid: {
		'& .accordion__item-wrapper': {
			boxShadow: '0 1.5rem 4rem rgba(22,28,45,.05)',
		},
	},
	fontWeightBold: {
		fontWeight: 'bold',
	},
	fontWeight300: {
		fontWeight: 300,
	},
	listItemAvatar: {
		marginRight: theme.spacing(2),
	},
	listItemText: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	answerCount: {
		padding: theme.spacing(1 / 2, 1),
		borderRadius: theme.spacing(1),
		background: theme.palette.secondary.light,
		color: 'white',
		fontWeight: 700,
	},
}));

export const Filter = ({ filters, setFilteres, usedFilters }: Props) => {
	const classes = useStyles();
	return (
		<div>
			<Grid item xs={12} className={classes.accordionGrid}>
				<Accordion
					titleProps={{
						variant: 'subtitle1',
						className: classes.fontWeightBold,
					}}
					subtitleProps={{
						className: classes.fontWeight300,
					}}
					data={filters}
					setFilteres={setFilteres}
					usedFilters={usedFilters}
				/>
			</Grid>
		</div>
	);
};

export default Filter;
