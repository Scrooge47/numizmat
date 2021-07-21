import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, Typography, Avatar, colors, Theme, CircularProgress } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import Label from 'src/components/Label';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		padding: theme.spacing(3),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	details: {
		display: 'flex',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	label: {
		marginLeft: theme.spacing(1),
	},
	circular: {
		marginLeft: theme.spacing(1),
	},
}));

interface IProps {
	className?: string;
	value: string;
	percent: number;
	name: string;
}

const DataItemCollection = (props: IProps) => {
	const { name, value, percent, className, ...rest } = props;

	const classes = useStyles();

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<div>
				<Typography component="h3" gutterBottom variant="overline">
					{name}
				</Typography>
				<div className={classes.details}>
					<Typography variant="h3">{value}</Typography>
					<Label className={classes.label} color={colors.green[600]} variant="outlined">
						{`${percent}%`}
					</Label>
					<CircularProgress className={classes.circular} variant="determinate" value={percent} />
				</div>
			</div>
		</Card>
	);
};

export default DataItemCollection;
