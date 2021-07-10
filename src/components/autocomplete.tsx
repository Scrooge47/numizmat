import { DocumentNode, useLazyQuery } from '@apollo/client';
import { CircularProgress, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect, useState } from 'react';
import * as _ from 'lodash';
import { DeepMap, FieldError } from 'react-hook-form';

interface IProps {
	label: string;
	variant?: 'outlined' | 'filled' | 'standard';
	setSelected(value: Option | null): void;
	query: DocumentNode;
	search: Object;
	pathOfInputSearch: string;
	pathOfData: string;
	pathOfId: 'id' | 'code';
	errors: DeepMap<Record<string, any>, FieldError>;
	field: string;
}

interface Option {
	[key: string]: any;
	name: string;
	id: string;
}

const AutocompleteComponent = (props: IProps) => {
	const {
		label,
		variant,
		query,
		search,
		pathOfInputSearch,
		pathOfData,
		pathOfId,
		errors,
		field,
		setSelected,
	} = props;
	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState<string>('');

	const [getData, { loading, data }] = useLazyQuery(query);
	const [options, setOptions] = useState<Option[]>([]);

	useEffect(() => {
		const searchForVariables = _.set(_.cloneDeep(search), pathOfInputSearch, inputValue);
		getData({ variables: searchForVariables });
		if (_.get(data, pathOfData)) setOptions(_.get(data, pathOfData));
	}, [inputValue]);

	return (
		<Autocomplete
			options={options}
			open={open}
			getOptionSelected={(option, value) => option.name === value.name}
			getOptionLabel={(option) => option.name}
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			onChange={(_, value) => setSelected(value!?.[pathOfId])}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
			}}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					variant={variant}
					margin="normal"
					error={!!errors?.[field]}
					helperText={errors?.[field]?.message}
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<>
								{loading ? <CircularProgress color="inherit" size={20} /> : null}
								{params.InputProps.endAdornment}
							</>
						),
					}}
				/>
			)}
		/>
	);
};

export default AutocompleteComponent;
