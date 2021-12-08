import { Typography } from '@material-ui/core';
import { GetStaticProps } from 'next';
import React from 'react';
import ListCoins from 'src/components/listCoins';
import { getCoinsNonAuthorized } from 'src/generated/getCoinsNonAuthorized';
import { COINS_QUERY_NON_AUTHORIZED } from 'src/graphql/queries';
import Layout from 'src/layouts';
import parsefiltersForQuery from 'src/utils/parsefiltersForQuery';
import { Model } from 'src/utils/types';
import { initializeApollo, addApolloState } from '../../src/apolloClient';

interface CoinsPageProps {
	coins: getCoinsNonAuthorized;
}

const CoinsPage = ({ coins }: CoinsPageProps): JSX.Element => {
	console.log('props', coins);
	return (
		<Layout>
			<Typography variant="h4">
				<ListCoins isLogIn={false} coins={coins} />
			</Typography>
		</Layout>
	);
};

export default CoinsPage;

export const getStaticProps: GetStaticProps = async (context) => {
	const apolloClient = initializeApollo();

	const data = await apolloClient.query({
		query: COINS_QUERY_NON_AUTHORIZED,
		variables: {
			filters: { filter: { ...parsefiltersForQuery(Model.Coin) }, first: 2 },
		},
	});

	console.log('page coin get static ', data);
	return addApolloState(apolloClient, {
		props: { coins: data.data },
	});
};
