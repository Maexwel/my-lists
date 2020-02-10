import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, blue } from '@material-ui/core/colors';

export const theme = createMuiTheme({
    palette: {
        primary: {
            ...blue,
            main: blue[700],
        }, // Main color for inputs
        secondary: {
            ...blueGrey,
            main: blueGrey[900],
        }, // Color used for layout.
    },
});

export const successColor = '#4CAF50'; // Success is not part of this material-ui version