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
import Link from 'next/link';
import UserMenu from 'src/components/UserMenu';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		boxShadow: 'none',
		background: theme.palette.primary.main,
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
				<List className={classes.flexGrow}>
					<ListItem>
						<Link href="/">
							<Typography>Коллекции</Typography>
						</Link>
					</ListItem>
				</List>
				<UserMenu />
			</Toolbar>
		</AppBar>
	);
};

export default Topbar;
