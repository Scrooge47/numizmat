import { Typography } from '@material-ui/core';
import ListCoins from 'src/components/listCoins';
import Layout from 'src/layouts';

export default function Home() {
	return (
		<Layout>
			<Typography variant="h4">
				<ListCoins />
			</Typography>
		</Layout>
	);
}
