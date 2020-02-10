import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, red } from '@material-ui/core/colors';

export const theme = createMuiTheme({
    palette: {
        primary: {
            ...blueGrey,
            main: blueGrey[900],
        }, // Main color for the layout (app bar, ...)
        secondary: {
            ...red,
            main: red[600],
        }, // Color used for inputs, ...
    },
});

export const successColor = '#4CAF50'; // Success is not part of this material-ui version