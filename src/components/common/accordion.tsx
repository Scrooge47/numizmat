/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import clsx from 'clsx';
//import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
	Typography,
	Grid,
	Accordion as MuiAccordion,
	AccordionSummary as MuiAccordionSummary,
	AccordionDetails as MuiAccordionDetails,
	FormControlLabel,
	Checkbox,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getCountryFromCoins_getCountryFromCoins } from 'src/generated/getCountryFromCoins';
import {
	filters_getFiltersFromCoins,
	filters_getFiltersFromCoins_country,
	filters_getFiltersFromCoins_nameCollection,
} from 'src/generated/filters';
import { Filters } from 'src/utils/types';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
	},
	expandOpen: {
		transform: 'rotate(180deg)',
		color: theme.palette.primary.dark,
	},
	listItem: {
		cursor: 'pointer',
	},
}));

type IItem = {
	id: string;
	title: string;
	data: [
		{
			code: string;
			name: string;
		},
	];
};

interface IProps {
	//items: [IItem];
	className?: {} | undefined;
	titleProps: {};
	subtitleProps: {};
	//textProps: {};
	data: Filters;
	setFilteres: React.Dispatch<React.SetStateAction<Filters>>;
	usedFilters: Filters;
}

const Accordion = (props: IProps) => {
	const { className, titleProps, subtitleProps, data, setFilteres, usedFilters, ...rest } = props;

	const classes = useStyles();
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, item: string) => {
		const value = e.target.value;

		setFilteres((prev) => {
			let arrValues = prev[item];
			if (arrValues.includes(value) && !e.target.checked)
				arrValues = arrValues.filter((i: string) => i != value);
			if (!arrValues.includes(value) && e.target.checked) arrValues.push(value);
			return { ...prev, [item]: arrValues };
		});
	};
	return (
		<div {...rest} className={clsx('accordion', classes.root, className)}>
			{Object.keys(data).map((item) => (
				<MuiAccordion className={clsx('accordion__item-wrapper', classes.listItem)} key={item}>
					<MuiAccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls={`${item}-content`}
						id={item}>
						<Grid container spacing={0} className="accorion__item-text-container">
							<Grid item xs={12} className="accorion__item-title-container">
								<Typography
									variant="h6"
									color="textPrimary"
									className="accorion_item-title"
									{...titleProps}>
									{item}
								</Typography>
							</Grid>
							{/* {item.subtitle && (
								<Grid item xs={12} className="accorion_item-subtitle-container">
									<Typography
										variant="subtitle1"
										color="textSecondary"
										className="accorion_item-subtitle"
										{...subtitleProps}>
										{item.subtitle}
									</Typography>
								</Grid>
							)} */}
						</Grid>
					</MuiAccordionSummary>
					<MuiAccordionDetails>
						<Grid container spacing={2} className="accordion__collapsable-text-container">
							<Grid item xs={12} className="accordion__collapsable-text-wrapper">
								<div>
									{data[item]?.map((i: any) => {
										return (
											<div key={i.code}>
												<FormControlLabel
													control={
														<Checkbox
															value={i.code}
															onChange={(e) => handleChange(e, item)}
															checked={usedFilters[item]?.includes(i.code)}
															color="primary"
														/>
													}
													label={i.name}
												/>
											</div>
										);
									})}
								</div>
							</Grid>
						</Grid>
					</MuiAccordionDetails>
				</MuiAccordion>
			))}
		</div>
	);
};

// Accordion.defaultProps = {
// 	titleProps: {},
// 	subtitleProps: {},
// 	textProps: {},
// 	linkProps: {},
// };

// Accordion.propTypes = {
// 	/**
// 	 * Classname from the parent component
// 	 */
// 	className: PropTypes.string,
// 	/**
// 	 * Items to show inside the accordion
// 	 */
// 	items: PropTypes.array.isRequired,
// 	/**
// 	 * Additional properties to pass to the title Typography component
// 	 */
// 	titleProps: PropTypes.object,
// 	/**
// 	 * Additional properties to pass to the subtitle Typography component
// 	 */
// 	subtitleProps: PropTypes.object,
// 	/**
// 	 * Additional properties to pass to the text Typography component
// 	 */
// 	textProps: PropTypes.object,
// 	/**
// 	 * Additional properties to pass to the link component
// 	 */
// 	linkProps: PropTypes.object,
// };

export default Accordion;
