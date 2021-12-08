import Profile from 'src/components/Profile/profile';
import Layout from 'src/layouts';
import { getSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';

const ProfilePage = () => {
	return (
		<Layout>
			<Profile />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession({ req: ctx.req });
	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default ProfilePage;
