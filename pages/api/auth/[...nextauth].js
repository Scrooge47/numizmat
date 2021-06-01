import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { prisma } from 'src/prisma';

export default NextAuth({
	providers: [
		Providers.Credentials({
			session: {
				jwt: true,
			},
			async authorize(credintials) {
				const user = await prisma.user.findUnique({
					where: {
						email: credintials.email,
					},
				});
				if (!user) {
					throw new Error('No user found');
				}
				return { email: user?.email };
			},
		}),
	],
});
