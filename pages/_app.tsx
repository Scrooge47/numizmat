import { AppProps } from 'next/app';
import '../styles/globals.css';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'src/theme';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'src/apolloClient';
import { Provider, getSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';

function MyApp({ Component, pageProps }: AppProps) {
	const client = useApollo(pageProps);
	return (
		<>
			<ApolloProvider client={client}>
				<ThemeProvider theme={theme}>
					<Provider session={pageProps.session}>
						<CssBaseline />
						<Component {...pageProps} />
					</Provider>
				</ThemeProvider>
			</ApolloProvider>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			session: await getSession(context),
		},
	};
};
export default MyApp;
