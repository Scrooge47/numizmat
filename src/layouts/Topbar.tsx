import {
	AppBar,
	List,
	ListItem,
	Toolbar,
	Typography,
	colors,
	makeStyles,
	Theme,
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		boxShadow: 'none',
		background: theme.palette.white,
		borderBottom: `1px solid ${colors.grey[200]}`,
	},
	flexGrow: {
		flexGrow: 1,
	},
	navigationContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	toolbar: {
		maxWidth: 1100,
		width: '100%',
		margin: '0 auto',
		padding: theme.spacing(0, 2),
	},
}));

const Topbar = () => {
	const classes = useStyles();
	return (
		<AppBar className={classes.root}>
			<Toolbar disableGutters className={classes.toolbar}>
				<List>
					<ListItem>
						<Typography>Коллекции</Typography>
					</ListItem>
				</List>
			</Toolbar>
		</AppBar>
	);
};

export default Topbar;
