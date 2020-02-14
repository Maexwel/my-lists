import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DashboardItem from '../DashboardItem/DashboardItem';
import { ListTable, CreateList } from '../list';
import { connect } from 'react-redux';
import { setListAction } from '../../store/actions/listActions';
import { Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import PageTitle from './PageTitle';

// Style def
const useStyles = makeStyles(theme => createStyles({
    fullHeight: {
        height: '100%',
    }
}));
// Base page of the app
// display the dashboard (lists, archive, ...)
const DashboardPage = ({ user, list, translation, listToState }) => {
    const classes = useStyles();

    // onInit, chose the first available list to display
    useEffect(() => {
        if (user.lists && user.lists.length > 0) {
            const listToLoad = user.lists.find(list => list.is_archived); // Find first list to display
            listToState(listToLoad); // Redux update list
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.lists]);

    return (
        <div>
            {/** Page title */}
            <PageTitle title={translation["DASHBOARD_PAGE"]} />
            {/** Dashboard items */}
            <Grid
                spacing={1}
                container
                justify="flex-start"
                alignItems="stretch">
                <Grid item xl={2} md={3} sm={6} xs={6}>
                    <DashboardItem label={translation["ACTIVE_LIST_DASHBOARD"]} />
                </Grid>
                <Grid item xl={2} md={3} sm={6} xs={6}>
                    <DashboardItem label={translation["ARCHIVED_LIST_DASHBOARD"]} />
                </Grid>
                <Grid item xl={2} md={3} sm={6} xs={6}>
                    <DashboardItem label={translation["SHARED_LIST_DASHBOARD"]} />
                </Grid>
                <Grid item xl={1} md={2} sm={12} xs={6} className={classes.fullHeight}>
                    {/** New list button */}
                    <CreateList />
                </Grid>
            </Grid>
            {/** first table */}
            <ListTable
            />
        </div>
    )
}
DashboardPage.propTypes = {
    user: PropTypes.shape({
        list_id: PropTypes.number,
        lists: PropTypes.array,
        name: PropTypes.string,
        created_at: PropTypes.string,
        is_archived: PropTypes.bool,
    }),
    translation: PropTypes.object,
    list: PropTypes.shape({

    })
};
// // //
// Redux connexion
const mapStateToProps = state => ({
    translation: state.lang.translation, // Current location in the app
    user: state.user, // Current location in the app
    list: state.list, // selected list to display
});

const mapDispatchToProps = dispatch => {
    return {
        listToState: (val) => {
            dispatch(
                setListAction(val)
            )
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);