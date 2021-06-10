// @flow
import {
	Button,
	CircularProgress,
	Container,
	Grid,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from 'src/graphql/mutations';
import { signIn } from 'next-auth/client';
import { registerSchema, loginSchema } from 'src/validation';
import { NewUserInput, UserInput } from 'src/schema/user';
import { formatError } from 'src/utils/types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import * as _ from 'lodash';

type Props = {
	type: Variant;
};

export enum Variant {
	Login = 'Login',
	SignUp = 'SignUp',
}
interface User {
	id: string;
	email: string;
}

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
	wrapper: {
		margin: theme.spacing(1),
		position: 'relative',
	},
	buttonProgress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
}));

const AuthForm = ({ type }: Props) => {
	const router = useRouter();
	const isLoginPage = type === Variant.Login;
	const validateSchema = isLoginPage ? loginSchema : registerSchema;

	const classes = useStyles();
	const {
		handleSubmit,
		control,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(validateSchema),
	});

	const [createUser, { data }] = useMutation<{ createUser: User }, { input: NewUserInput }>(
		CREATE_USER,
		{
			onError(err) {
				const objErr = err.graphQLErrors[0].extensions;
				for (let key in objErr) {
					if (_.get(objErr[key], 'path')) {
						setError(objErr[key].path, { type: 'apollo', message: objErr[key].message });
					}
				}
			},
			errorPolicy: 'none',
		},
	);

	const onSubmit = async (data: NewUserInput) => {
		if (type === Variant.SignUp) {
			const user = await createUser({
				variables: {
					input: {
						email: data.email,
						password: data.password,
						confirmPassword: data.confirmPassword,
					},
				},
			});
		} else {
			const result = await signIn('credentials', {
				redirect: false,
				email: data.email,
				password: data.password,
			});
			if (result.error) {
				const errors: formatError[] = JSON.parse(result.error as string);
				errors.forEach((i) =>
					setError(i.path as 'string', { type: 'nextAuth', message: i.message }),
				);
			}
			if (!result.error) {
				router.replace('/');
			}
		}
	};

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
										name="confirmPassword"
										defaultValue=""
										render={({ field }) => (
											<TextField
												label="confirm password"
												fullWidth
												variant="outlined"
												margin="dense"
												type="password"
												{...field}
												error={!!errors?.confirmPassword}
												helperText={errors?.confirmPassword?.message}
											/>
										)}
									/>
								)}
								<div className={classes.wrapper}>
									<Grid item xs={12}>
										<Button
											type="submit"
											fullWidth
											variant="contained"
											color="primary"
											disabled={isSubmitting}>
											{isLoginPage ? 'Войти' : 'Создать'}
										</Button>
										{isSubmitting && (
											<CircularProgress size={24} className={classes.buttonProgress} />
										)}
									</Grid>
								</div>
								<Grid item xs={12}>
									{isLoginPage ? (
										<Typography variant="subtitle1" color="textSecondary" align="center">
											Don't have an account?{' '}
											<Typography component="span" color="primary">
												<Link href="/signup">Sign up </Link>
											</Typography>
										</Typography>
									) : (
										<Typography variant="subtitle1" color="textSecondary" align="center">
											Already have an account?{' '}
											<Typography component="span" color="primary">
												<Link href="/login">Login</Link>
											</Typography>
										</Typography>
									)}
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
