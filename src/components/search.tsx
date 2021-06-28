import React, { Dispatch, ReactEventHandler, SetStateAction, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Chip, Divider, Input, Card, colors, Theme } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import {
	filtersOfUser_getFiltersFromCoinsOfUser,
	filtersOfUser_getFiltersFromCoinsOfUser_country,
	filtersOfUser_getFiltersFromCoinsOfUser_nameCollection,
} from 'src/generated/filtersOfUser';
import MultiSelect from './Multiselect';

const useStyles = makeStyles((theme: Theme) => ({
	root: {},
	keywords: {
		padding: theme.spacing(2),
		display: 'flex',
		alignItems: 'center',
	},
	searchIcon: {
		color: theme.palette.common.white,
		marginRight: theme.spacing(2),
	},
	chips: {
		padding: theme.spacing(2),
		display: 'flex',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	chip: {
		margin: theme.spacing(1),
	},
	selects: {
		display: 'flex',
		alignItems: 'center',
		flexWrap: 'wrap',
		backgroundColor: colors.grey[50],
		padding: theme.spacing(1),
	},
	inNetwork: {
		marginLeft: 'auto',
	},
}));

// const selects = [
// 	{
// 		label: 'Страна',
// 		options: [
// 			{ name: 'Россия', id: 1, label: 'Страна' },
// 			{ name: 'Греция', id: 2, label: 'Страна' },
// 			{ name: 'Финлядия', id: 3, label: 'Страна' },
// 		],
// 	},
// 	{
// 		label: 'Коллекция',
// 		options: [
// 			{ name: '2 Евро', id: 1, label: 'Коллекция' },
// 			{ name: '10 рублей Российская Федерация', id: 3, label: 'Коллекция' },
// 		],
// 	},
// ];

interface Chip {
	id: number;
	name: string;
	label?: string;
}

interface IProps {
	className?: string;
	filters: filtersOfUser_getFiltersFromCoinsOfUser | undefined;
	chips: Chip[];
	setChips: Dispatch<SetStateAction<Chip[]>>;
	inputValue: string;
	setInputValue: Dispatch<SetStateAction<string>>;
}

const Search = (props: IProps) => {
	const { className, filters, chips, setChips, inputValue, setInputValue, ...rest } = props;

	const selects: [{ label: 'Страна'; options: Chip[] }, { label: 'Коллекция'; options: Chip[] }] = [
		{
			label: 'Страна',
			options: [],
		},
		{
			label: 'Коллекция',
			options: [],
		},
	];

	if (!filters) return <div>loading ...</div>;
	selects[0].options = [...(filters.country as filtersOfUser_getFiltersFromCoinsOfUser_country[])];
	selects[1].options = [
		...(filters.nameCollection as filtersOfUser_getFiltersFromCoinsOfUser_nameCollection[]),
	];

	selects[0].options = selects[0].options.map((i) => ({ ...i, ...{ label: 'Страна' } }));
	selects[1].options = selects[1].options.map((i) => ({ ...i, ...{ label: 'Коллекция' } }));

	const classes = useStyles();

	const [] = useState('');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		event.persist();
		setInputValue(event.target.value);
		console.log('input', event.target.value);
	};

	const handleInputKeyup = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		event.persist();

		// if (event.keyCode === 13 && inputValue) {
		// 	if (!chips.includes(inputValue)) {
		// 		setChips((chips) => [...chips, inputValue]);
		// 		setInputValue('');
		// 	}
		// }
	};

	const handleChipDelete = (chip: Chip) => {
		setChips((chips) => chips.filter((c) => chip.label !== c.label && chip.id !== c.id));
	};

	const handleMultiSelectChange = (value: Chip[]) => {
		setChips(value);
	};

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<div className={classes.keywords}>
				<SearchIcon className={classes.searchIcon} />
				<Input
					disableUnderline
					onChange={handleInputChange}
					onKeyUp={handleInputKeyup}
					placeholder="Enter a keyword"
					value={inputValue}
				/>
			</div>
			<Divider />
			<div className={classes.chips}>
				{chips.map((chip) => (
					<Chip
						className={classes.chip}
						deleteIcon={<CloseIcon />}
						key={chip.id}
						label={chip.name}
						onDelete={() => handleChipDelete(chip)}
					/>
				))}
			</div>
			<Divider />
			<div className={classes.selects}>
				{selects.map((select) => (
					<MultiSelect
						key={select.label}
						label={select.label}
						onChange={handleMultiSelectChange}
						options={select.options}
						value={chips}
					/>
				))}
			</div>
		</Card>
	);
};

export default Search;
