import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// Create a theme instance.
const theme = responsiveFontSizes(createMuiTheme({
  typography: {
    fontFamily: 'Lato',
  },
}));

export default theme;