import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import addCoin from 'pages/addcoin';
import AddCoin from 'src/components/addCoin';
import { GET_COIN } from 'src/graphql/queries';
const EditCoin = () => {
	const {
		query: { id },
	} = useRouter();

	if (!id) return null;
	console.log('id', id);
	return <CoinData id={id as string} />;
};

const CoinData = ({ id }: { id: string }) => {
	const { data, loading } = useQuery(GET_COIN, { variables: { id } });

	if (loading) return <div>Получение данных ...</div>;
	console.log('data', data);
	return <AddCoin item={data.coin} />;
};

export default EditCoin;
