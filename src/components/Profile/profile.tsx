import React from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, List, ListItem, Grid, Typography, Card, Theme, CardContent } from '@material-ui/core';

import MyCollection from './MyCollection';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		maxWidth: 1100,
		width: '100%',
		margin: '0 auto',
		background: theme.palette.grey[200],
		padding: theme.spacing(6, 2),
		[theme.breakpoints.up('sm')]: {
			padding: theme.spacing(12, 2),
		},
	},

	menu: {
		height: 'auto',
		boxShadow: '0 2px 10px 0 rgba(23,70,161,.11)',
	},
	menuContent: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		padding: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(3),
		},
	},
	list: {
		display: 'inline-flex',
		overflow: 'auto',
		flexWrap: 'nowrap',
		width: '100%',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
			flexDirection: 'column',
			marginRight: theme.spacing(-3),
			marginLeft: theme.spacing(-3),
		},
	},
	listItem: {
		marginRight: theme.spacing(2),
		flex: 0,
		[theme.breakpoints.up('md')]: {
			paddingRight: theme.spacing(3),
			paddingLeft: theme.spacing(3),
			borderLeft: '2px solid transparent',
		},
	},
	listItemActive: {
		[theme.breakpoints.up('md')]: {
			borderLeft: `2px solid ${theme.palette.primary.dark}`,
		},
		'& .menu__item': {
			color: theme.palette.text.primary,
		},
	},
}));

const subPages = [
	{
		id: 'myCollection',
		href: '/account/myCollection',
		title: 'Моя коллекция',
	},
	{
		id: 'settings',
		href: '/account/settings',
		title: 'Настройки',
	},
];

interface IPropsTabPanel {
	value: string;
	index: string;
	children: React.ReactNode;
}
const TabPanel = (props: IPropsTabPanel) => {
	const { children, value, index, ...other } = props;

	return (
		<Box component="div" hidden={value !== index} {...other}>
			{value === index && children}
		</Box>
	);
};

const Profile = () => {
	const classes = useStyles();
	const router = useRouter();
	let pageId = router.query.page as string;

	if (!pageId) {
		pageId = 'myCollection';
	}

	return (
		<div className={classes.root}>
			{/* <Hero /> */}

			<Grid container spacing={4}>
				<Grid item xs={12} md={3}>
					<Card className={clsx(classes.menu)}>
						<CardContent className={clsx(classes.menuContent)}>
							<List disablePadding className={classes.list}>
								{subPages.map((item, index) => (
									<ListItem
										key={index}
										component={'a'}
										href={item.href}
										className={clsx(
											classes.listItem,
											pageId === item.id ? classes.listItemActive : {},
										)}
										disableGutters>
										<Typography
											variant="subtitle1"
											noWrap
											color="textSecondary"
											className="menu__item">
											{item.title}
										</Typography>
									</ListItem>
								))}
							</List>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} md={9}>
					<Card className={clsx('card-base', classes.menu)}>
						<CardContent className={clsx(classes.menuContent)}>
							<TabPanel value={pageId} index={'myCollection'}>
								<MyCollection />
							</TabPanel>
							<TabPanel value={pageId} index={'security'}>
								{/* <Security /> */}
							</TabPanel>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
};

export default Profile;
