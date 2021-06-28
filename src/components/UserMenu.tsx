import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useSession } from 'next-auth/client';
import { Session } from 'next-auth';
import Link from 'next/link';
import { signOut } from 'next-auth/client';

interface IProps {}

const useStyles = makeStyles((theme: Theme) => ({
	icon: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'flex',
		},
	},
	textLogin: {
		display: 'none',

		[theme.breakpoints.up('md')]: {
			display: 'flex',
			flexDirection: 'column',
			marginLeft: '1.2rem',
			marginRigth: '1.2rem',
			alignItems: 'flex-start',
		},
	},
}));

function UserMenu(props: IProps) {
	const classes = useStyles();
	const [session, loading]: [Session | null, boolean] = useSession();
	const user = session?.user;
	const [userMenu, setUserMenu] = useState<HTMLButtonElement | null>(null);

	const userMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};

	return (
		<>
			{user ? (
				<Button className="h-64" onClick={userMenuClick} color="inherit">
					<Avatar className="" alt="user photo">
						{user.email?.substr(0, 1)}
					</Avatar>

					<div className={classes.textLogin}>
						<Typography component="span" className="normal-case font-600 flex">
							{user?.email?.split('@')[0]}
						</Typography>
					</div>

					<Icon className={classes.icon}>keyboard_arrow_down</Icon>
				</Button>
			) : (
				<Link href="/login">
					<Button className="h-64" color="inherit">
						<Icon>lock</Icon>
						<div className={classes.textLogin}>
							<Typography component="span" className="normal-case font-600 flex">
								Login
							</Typography>
						</div>
					</Button>
				</Link>
			)}
			<Popover
				open={Boolean(userMenu)}
				anchorEl={userMenu}
				onClose={userMenuClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				classes={{
					paper: 'py-8',
				}}>
				{user && (
					<>
						<Link href="/account/myCollection">
							<MenuItem onClick={userMenuClose} role="button">
								<>
									<ListItemIcon className="min-w-40">
										<Icon>account_circle</Icon>
									</ListItemIcon>
									<ListItemText primary="My Profile" />
								</>
							</MenuItem>
						</Link>
						<MenuItem
							onClick={() => {
								signOut();
							}}>
							<ListItemIcon className="min-w-40">
								<Icon>exit_to_app</Icon>
							</ListItemIcon>
							<ListItemText primary="Logout" />
						</MenuItem>
					</>
				)}
			</Popover>
		</>
	);
}

export default UserMenu;
