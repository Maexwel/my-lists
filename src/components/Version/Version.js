import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

// Style def
const useStyles = makeStyles(theme => createStyles({
    root: {
        color: theme.palette.grey[500],
    }
}));
// Display Version value
const Version = (props) => {
    const classes = useStyles();

    return (
        <Typography
            {...props}
            className={clsx(props.className, classes.root)}
            variant="h5">
            {`version ${process.env.REACT_APP_VERSION}`}
        </Typography>
    );
};
export default Version;