import { createMuiTheme } from '@material-ui/core/styles';
import { grey, blue } from '@material-ui/core/colors';

export const theme = createMuiTheme({
    palette: {
        primary: grey, // Main color for the layout (app bar, ...)
        secondary: blue, // Color used for inputs, ...
    },
});

export const successColor = '#4CAF50'; // Success is not part of this material-ui version