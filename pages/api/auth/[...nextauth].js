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

				return { email: user?.email };
			},
		}),
	],
});
