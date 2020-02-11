import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, CardHeader, Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

// Style def
const useStyles = makeStyles(theme => createStyles({
    root: {
        cursor: 'pointer',
        '&:hover': {
            boxShadow: theme.shadows[5],
        }
    },
    header: {
        background: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    content: {
        padding: theme.spacing(1)
    },
    countLabel: {
        fontSize: 35,
        fontWeight: 'bold',
    }
}));
// Item to display values in the dashboard such as number of items
const DashboardItem = ({ onClick, label, count = 0 }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                className={classes.header}
                title={label} />
            <CardContent className={classes.content}>
                <Grid
                    container
                    justify="center"
                    alignItems="center">
                    <Typography className={classes.countLabel} component="h6">{count}</Typography>
                </Grid>
            </CardContent>
        </Card>
    )
};
DashboardItem.propTypes = {
    label: PropTypes.string,
    count: PropTypes.number,
    onClick: PropTypes.func,
};
export default DashboardItem;