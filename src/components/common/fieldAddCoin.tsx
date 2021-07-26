import {
	addCoinToCollection,
	addCoinToCollectionVariables,
} from 'src/generated/addCoinToCollection';
import PlusMinusButtons from './plusMinusButtons';
import { DataProxy, gql, MutationFunctionOptions } from '@apollo/client';
import { COLLECTION_OF_USER } from 'src/graphql/queries';
import { collection, collection_collectionOfUser_coin } from 'src/generated/collection';
import { filterDefault } from 'src/const';
import { Model } from 'src/utils/types';
import { Condition } from 'src/schema/price';

interface IProps {
	item: {
		id: string;
	};
	count: number;
	addCoin: (
		options?:
			| MutationFunctionOptions<addCoinToCollection, addCoinToCollectionVariables>
			| undefined,
	) => Promise<any>;
	model: Model;
	condition: Condition;
}

enum TypeOperation {
	minus,
	plus,
}

const FieldAddCoin = ({ item, addCoin, model, condition, count }: IProps) => {
	const hangleChange = (type: TypeOperation) => {
		const newCount = type === TypeOperation.minus ? count - 1 : count + 1;
		const { id } = item;
		//const defaultFilter = filterDefault('', model);
		addCoin({
			variables: {
				input: {
					coin: {
						connect: {
							id,
						},
					},
					count: newCount,
					condition: condition,
				},
			},
			update: async (store: DataProxy, { data }) => {
				// const collection = await store.readQuery<collection>({
				// 	query: COLLECTION_OF_USER,
				// 	variables: {
				// 		filters: defaultFilter,
				// 	},
				// });
				// const newCache = collection?.collectionOfUser.map((i) => {
				// 	let count = i.coin.count;
				// 	if (i.coin.id === id) {
				// 	const 	i.coin.prices.map((j) => {
				// 			if (j.condition === condition) {
				// 				count = newCount;
				// 			}
				// 		});
				// 	}
				// 	return { ...i, ...{ coin: { ...i.coin, count } } };
				// });
				const cacheCoin = await store.readFragment<collection_collectionOfUser_coin>({
					id: `Coin:${item.id}`,
					fragment: gql`
						fragment MyCoin on Coin {
							name
							count
							publicId
							id
							favorite
							prices {
								condition
								price
								currency {
									code
									name
								}
								count
							}
						}
					`,
				});

				const newCachePrice = cacheCoin?.prices.map((i) => {
					let count = i.count;
					if (i.condition === condition) {
						count = newCount;
					}
					return { ...i, count };
				});

				await store.writeFragment({
					id: `Coin:${item.id}`,
					fragment: gql`
						fragment MyCoin on Coin {
							name
							count
							publicId
							id
							favorite
							prices {
								condition
								price
								currency {
									code
									name
								}
								count
							}
						}
					`,
					data: {
						prices: newCachePrice,
					},
				});
				// await store.writeQuery({
				// 	query: COLLECTION_OF_USER,
				// 	data: { collectionOfUser: newCache },
				// 	variables: {
				// 		filters: defaultFilter,
				// 	},
				// });
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
		<PlusMinusButtons counter={count} handleDecrement={decrement} handleIncrement={increment} />
	);
};

export default FieldAddCoin;
