import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

// Style def
const useStyles = makeStyles(theme => createStyles(
    {
        root: {
            padding: theme.spacing(2),
        },
        text: {
            fontSize: 35,
        }
    }
));
// Title of a page (display at the top)
const PageTitle = ({ title = '' }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography className={classes.text} component="h2">{title}</Typography>
            <Divider />
        </div>
    )
};
PageTitle.propTypes = {
    title: PropTypes.string,
};
export default PageTitle;