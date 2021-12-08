import { Typography } from '@material-ui/core';
import ListCoins from 'src/components/listCoins';
import Layout from 'src/layouts';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { Session } from 'next-auth';

interface HomeProps {
	session: Session;
}

export default function Home({ session }: HomeProps) {
	return (
		<Layout>
			<Typography variant="h4">
				<ListCoins isLogIn={true} session={session} />
			</Typography>
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession({ req: context.req });

	if (!session) {
		return {
			redirect: {
				destination: '/coins',
				permanent: true,
			},
		};
	}

	return {
		props: { session },
	};
};
