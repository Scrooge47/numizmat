// @flow
import { Button, Container, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from 'src/graphql/mutations';
import { signIn } from 'next-auth/client';
type Props = {
	type: Variant;
};

export enum Variant {
	Login = 'Login',
	SignUp = 'SignUp',
}

interface IFormInput {
	email: string;
	password: string;
	passwordConfirm: string;
}

interface User {
	id: string;
	email: string;
}

interface InputUser {
	email: string;
	password: string;
}

const schema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
	passwordConfirm: yup.string().when('password', {
		is: (val: string) => (val && val.length > 0 ? true : false),
		then: yup.string().oneOf([yup.ref('password')], 'Both passwofrd need to be the same'),
	}),
});

const useStyles = makeStyles((theme: Theme) => ({
	root: {},
	formContainer: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: `calc(100vh - 64px)`,
		maxWidth: 500,
		margin: `0 auto`,
	},
}));

const AuthForm = ({ type }: Props) => {
	const [createUser, { data }] = useMutation<{ createUser: User }, { input: InputUser }>(
		CREATE_USER,
		{
			onError(err) {
				console.log(err);
				const objErr = err.graphQLErrors[0].extensions;
				console.log(objErr);
			},
			errorPolicy: 'none',
		},
	);
	const classes = useStyles();
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = async (data: IFormInput) => {
		console.log(data);
		if (type === Variant.SignUp) {
			const user = await createUser({
				variables: { input: { email: data.email, password: data.password } },
			});
		} else {
			const result = await signIn('credentials', {
				redirect: false,
				email: data.email,
				password: data.password,
			});
			console.log('result', result);
		}
	};
	console.log('errors', errors);
	return (
		<>
			<div className={classes.formContainer}>
				<Container maxWidth="lg">
					<Grid container alignItems="center">
						<Grid item xs={12}>
							<Typography variant="h3" align="center">
								{type === Variant.Login ? 'Login' : 'Sign up'}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<form onSubmit={handleSubmit(onSubmit)}>
								<Controller
									control={control}
									name="email"
									defaultValue=""
									render={({ field }) => (
										<TextField
											label="email"
											fullWidth
											{...field}
											variant="outlined"
											margin="dense"
											error={!!errors?.email}
											helperText={errors?.email?.message}
										/>
									)}
								/>
								<Controller
									control={control}
									name="password"
									defaultValue=""
									render={({ field }) => (
										<TextField
											label="password"
											fullWidth
											variant="outlined"
											margin="dense"
											type="password"
											{...field}
											error={!!errors?.password}
											helperText={errors?.password?.message}
										/>
									)}
								/>
								{type === Variant.SignUp && (
									<Controller
										control={control}
										name="passwordConfirm"
										defaultValue=""
										render={({ field }) => (
											<TextField
												label="confirm password"
												fullWidth
												variant="outlined"
												margin="dense"
												type="password"
												{...field}
												error={!!errors?.passwordConfirm}
												helperText={errors?.passwordConfirm?.message}
											/>
										)}
									/>
								)}

								<Grid item xs={12}>
									<Button type="submit" fullWidth variant="contained" color="primary">
										Создать
									</Button>
								</Grid>
							</form>
						</Grid>
					</Grid>
				</Container>
			</div>
		</>
	);
};

export default AuthForm;
