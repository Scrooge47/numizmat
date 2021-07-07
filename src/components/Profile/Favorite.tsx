import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Divider, Grid } from '@material-ui/core';
import { useMutation, useQuery } from '@apollo/client';

import { GET_FAVORITES } from 'src/graphql/queries';
import ListOfCoins from './Components/ListOfCoins';
import { Model } from 'src/utils/types';
import {
	addCoinToCollection,
	addCoinToCollectionVariables,
} from 'src/generated/addCoinToCollection';
import { ADD_COIN_TO_COLLECTION } from 'src/graphql/mutations';
import { getFavoriteCoin } from 'src/generated/getFavoriteCoin';

const useStyles = makeStyles((theme: Theme) => ({
	root: {},
}));

interface IProps {
	className?: string;
}

const Favorite = (props: IProps) => {
	const classes = useStyles();
	const { data, loading } = useQuery<getFavoriteCoin>(GET_FAVORITES);

	const [addCoin] =
		useMutation<addCoinToCollection, addCoinToCollectionVariables>(ADD_COIN_TO_COLLECTION);
	if (loading) return <>loading ...</>;
	return (
		<div className={clsx(classes.root)}>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Divider />
				</Grid>

				<ListOfCoins data={data?.getFavoriteCoin} addCoin={addCoin} model={Model.Collection} />
			</Grid>
		</div>
	);
};

export default Favorite;
