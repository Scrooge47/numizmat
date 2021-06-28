import React, { Fragment, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, Checkbox, FormControlLabel, Menu, MenuItem, Theme } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

interface Chip {
	id: number;
	name: string;
	label?: string;
}

interface IProps {
	label: string;
	options: Chip[];
	value: Chip[];
	onChange: (chips: Chip[]) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {},
	menuItem: {
		padding: 0,
	},
	formControlLabel: {
		padding: theme.spacing(0.5, 2),
		width: '100%',
		margin: 0,
	},
}));

const MultiSelect = (props: IProps) => {
	const { label, options, value, onChange } = props;

	const classes = useStyles();

	const anchorRef = useRef(null);

	const [openMenu, setOpenMenu] = useState(false);

	const handleMenuOpen = () => {
		setOpenMenu(true);
	};

	const handleMenuClose = () => {
		setOpenMenu(false);
	};

	const handleOptionToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		let newValue: Chip[] = [...value];
		let target = event.target as HTMLInputElement;
		const ElValue = JSON.parse(target.value);
		if (target.checked) {
			newValue.push(ElValue);
		} else {
			newValue = newValue.filter((item) => item.label !== ElValue.label && item.id !== ElValue.id);
		}
		onChange && onChange(newValue);
	};

	return (
		<Fragment>
			<Button onClick={handleMenuOpen} ref={anchorRef}>
				{label}
				<ArrowDropDownIcon />
			</Button>
			<Menu anchorEl={anchorRef.current} onClose={handleMenuClose} open={openMenu}>
				{options.map((option) => (
					<MenuItem className={classes.menuItem} key={option.id}>
						<FormControlLabel
							className={classes.formControlLabel}
							control={
								<Checkbox
									checked={!!value.find((e) => e.label === option.label && e.id === option.id)}
									color="primary"
									onClick={handleOptionToggle}
									value={JSON.stringify(option)}
								/>
							}
							label={option.name}
						/>
					</MenuItem>
				))}
			</Menu>
		</Fragment>
	);
};
export default MultiSelect;
