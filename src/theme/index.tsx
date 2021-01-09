import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { faIR } from '@material-ui/core/locale';

let theme = createMuiTheme(
  {
    direction: 'rtl',
    palette: {
      // background: { paper: '#a0dcff', default: '#a8dcfa' },
      primary: {
        main: '#109c0b',
      },
      secondary: {
        main: '#60c7f6',
      },
    },
    typography: {
      fontFamily: [
        'Vazir',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  },
  { faIR },
);
theme = responsiveFontSizes(theme);

export default theme;
