import { AppProps } from 'next/app';
import '../styles/globals.css';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'src/theme';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'src/apolloClient';

function MyApp({ Component, pageProps }: AppProps) {
	const client = useApollo();
	return (
		<>
			<ApolloProvider client={client}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Component {...pageProps} />
				</ThemeProvider>
			</ApolloProvider>
		</>
	);
}

export default MyApp;
