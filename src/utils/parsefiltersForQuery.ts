import _ from 'lodash';
import { filterDefault } from 'src/const';
import { Chip, Model } from './types';
import { CoinFilter } from 'src/schema/collection';
import { Filters } from 'src/schema/coin';

const parsefiltersForQuery = (
	mode: Model,
	filters: Chip[] = [],
	inputValue: string = '',
): CoinFilter | Filters => {
	const countryCode: string[] = [];
	const nameCollectionCode: number[] = [];

	filters.map((i) => {
		if (i.label === 'Страна') countryCode.push('' + i.id);
		if (i.label === 'Коллекция') nameCollectionCode.push(i.id);
	});

	const finalFilter = filterDefault(inputValue, mode);

	if (mode === Model.Coin) {
		if (countryCode.length) _.set(finalFilter, 'country.code.in', countryCode);
	} else if (countryCode.length) _.set(finalFilter, 'coin.country.code.in', countryCode);

	if (mode === Model.Coin) {
		if (nameCollectionCode.length) _.set(finalFilter, 'NameCollection.id.in', nameCollectionCode);
	} else if (nameCollectionCode.length)
		_.set(finalFilter, 'coin.NameCollection.id.in', nameCollectionCode);

	console.log('finalFilter', finalFilter);
	return finalFilter;
};

export default parsefiltersForQuery;
