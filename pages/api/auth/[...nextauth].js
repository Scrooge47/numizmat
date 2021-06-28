import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { prisma } from 'src/prisma';
import { loginSchema } from 'src/validation';
import { formatYupError } from 'src/utils/formatYupErrors';
import bcrypt from 'bcrypt';

export default NextAuth({
	providers: [
		Providers.Credentials({
			session: {
				jwt: true,
			},
			async authorize(credintials) {
				const { email, password } = credintials;
				try {
					await loginSchema.validate({ email, password }, { abortEarly: false });
				} catch (error) {
					throw new Error(JSON.stringify(formatYupError(error)));
				}
				const user = await prisma.user.findUnique({
					where: {
						email: credintials.email,
					},
				});

				if (!user) {
					throw new Error(JSON.stringify([{ path: 'email', message: 'No user found' }]));
				}

				const matchPassword = await bcrypt.compare(password, user.password);

				if (!matchPassword) {
					throw new Error(JSON.stringify([{ path: 'password', message: 'incorrect password' }]));
				}

				return { email: user?.email, id: user?.id, id2: 'sdfsdfsd' };
			},
		}),
	],
	callbacks: {
		/**
		 * @param  {object}  token     Decrypted JSON Web Token
		 * @param  {object}  user      User object      (only available on sign in)
		 * @param  {object}  account   Provider account (only available on sign in)
		 * @param  {object}  profile   Provider profile (only available on sign in)
		 * @param  {boolean} isNewUser True if new user (only available on sign in)
		 * @return {object}            JSON Web Token that will be saved
		 */
		async jwt(token, user, account, profile, isNewUser) {
			// Add access_token to the token right after signin

			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session(session, token) {
			// Add property to session, like an access_token from a provider.
			if (token?.id) {
				session.user.id = token.id;
			}
			return session;
		},
	},
});
