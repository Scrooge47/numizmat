import {
	addCoinToCollection,
	addCoinToCollectionVariables,
} from 'src/generated/addCoinToCollection';
import PlusMinusButtons from './plusMinusButtons';
import { DataProxy, MutationFunctionOptions } from '@apollo/client';
import { COLLECTION_OF_USER } from 'src/graphql/queries';
import { collection } from 'src/generated/collection';
import { filterDefault } from 'src/const';

interface IProps {
	item: {
		count: number;
		id: string;
	};
	addCoin: (
		options?:
			| MutationFunctionOptions<addCoinToCollection, addCoinToCollectionVariables>
			| undefined,
	) => Promise<any>;
}

enum TypeOperation {
	minus,
	plus,
}

const FieldAddCoin = ({ item, addCoin }: IProps) => {
	const hangleChange = (type: TypeOperation) => {
		const newCount = type === TypeOperation.minus ? item.count - 1 : item.count + 1;
		const { id } = item;
		const defaultFilter = filterDefault('');
		addCoin({
			variables: {
				input: {
					coin: {
						connect: {
							id,
						},
					},
					count: newCount,
				},
			},
			update: async (store: DataProxy, { data }) => {
				const collection = await store.readQuery<collection>({
					query: COLLECTION_OF_USER,
					variables: {
						filters: defaultFilter,
					},
				});
				const newCache = collection?.collectionOfUser.map((i) => {
					let count = i.coin.count;
					if (i.coin.id === id) count = newCount;
					return { ...i, ...{ coin: { ...i.coin, count } } };
				});
				await store.writeQuery({
					query: COLLECTION_OF_USER,
					data: { collectionOfUser: newCache },
					variables: {
						filters: defaultFilter,
					},
				});
			},
		});
	};
	const increment = () => {
		hangleChange(TypeOperation.plus);
	};

	const decrement = () => {
		hangleChange(TypeOperation.minus);
	};

	return (
		<PlusMinusButtons
			counter={item.count}
			handleDecrement={decrement}
			handleIncrement={increment}
		/>
	);
};

export default FieldAddCoin;
