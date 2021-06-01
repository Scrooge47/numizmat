import { useLazyQuery } from '@apollo/client';
import { CircularProgress, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect, useState } from 'react';
import { SEARCH_COUNTRIES_QUERY } from 'src/graphql/queries';
interface IProps {
	label: string;
	variant?: 'outlined' | 'filled' | 'standard';
	setSelected(value: CountryType | null): void;
}

interface CountryType {
	name: string;
	code: string;
}

const AutocompleteComponent = (props: IProps) => {
	const { label, variant, setSelected } = props;
	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState<string>('');
	const [loadCountries, { loading, data }] = useLazyQuery(SEARCH_COUNTRIES_QUERY);
	const [options, setOptions] = useState<CountryType[]>([]);

	useEffect(() => {
		(async () => {
			console.log(inputValue);
			await loadCountries({ variables: { search: inputValue } });
			if (data?.searchCountry) setOptions(data?.searchCountry);
		})();
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
			onChange={(_, value) => setSelected(value)}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
			}}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					variant={variant}
					margin="normal"
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
