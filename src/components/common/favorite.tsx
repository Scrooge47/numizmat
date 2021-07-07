import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button, IconButton, Tooltip, colors, Theme } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { useMutation } from '@apollo/client';
import { CHANGE_FAVORITE } from 'src/graphql/mutations';
import { favoriteCoin, favoriteCoinVariables } from 'src/generated/favoriteCoin';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center',
	},
	likeButton: {},
	likedButton: {
		color: colors.red[600],
	},
	shareButton: {
		marginLeft: 'auto',
	},
	shareIcon: {
		marginRight: theme.spacing(1),
	},
}));

interface Coin {
	name: string;
	count: number;
	publicId: string;
	id: string;
	favorite: boolean;
}

interface IProps {
	coin: Coin;
	className?: string;
}

const Favorite = (props: IProps) => {
	const { coin, className, ...rest } = props;

	const classes = useStyles();
	const [changeFavorite, { data }] =
		useMutation<favoriteCoin, favoriteCoinVariables>(CHANGE_FAVORITE);
	//const [liked, setLiked] = useState(coin.favorite);

	const handleLike = () => {
		//	setLiked(true);
		changeFavorite({
			variables: { input: { id: coin.id, favoriteState: true } },
			optimisticResponse: {
				favoriteCoin: {
					__typename: 'Coin',
					id: coin.id,
					favorite: true,
				},
			},
		});
	};

	const handleUnlike = () => {
		//setLiked(false);
		changeFavorite({
			variables: { input: { id: coin.id, favoriteState: false } },
			optimisticResponse: {
				favoriteCoin: {
					__typename: 'Coin',
					id: coin.id,
					favorite: false,
				},
			},
		});
	};

	return (
		<div {...rest} className={clsx(classes.root, className)}>
			{coin.favorite ? (
				<Tooltip title="Unsave">
					<IconButton className={classes.likedButton} onClick={handleUnlike} size="small">
						<BookmarkIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Save">
					<IconButton className={classes.likeButton} onClick={handleLike} size="small">
						<BookmarkBorderIcon />
					</IconButton>
				</Tooltip>
			)}
		</div>
	);
};
export default Favorite;
