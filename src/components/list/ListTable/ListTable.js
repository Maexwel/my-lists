import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { DataTable } from '../../ui-kit';
import { ServiceLocatorContext } from '../../context';
import { withApollo } from 'react-apollo';
import { useSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { updateListAction } from '../../../store/actions/listActions';

// DataTable configured for the list items with actions
const ListTable = ({ client, listToState, list = {} }) => {
    const { listService, notificationFactory } = useContext(ServiceLocatorContext);
    const { enqueueSnackbar } = useSnackbar(); // Notification

    // on list id ready
    useEffect(() => {
        loadList(); // Load list values
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list.list_id]);

    // load list data using list_id value
    const loadList = async () => {
        listService._client = client; // Setup client
        try {
            const listData = await listService.fetchListById(list.list_id); // Service
            listToState(listData); // Redux set list data
        } catch (err) {
            enqueueSnackbar(notificationFactory.buildNotification({ title: "Error", content: 'ERROR', variant: 'error' })); // Push notification
        }
    };

    return list.list_id ? (
        <DataTable
            checkable={false}
            data={list.lists}
            title={list.name}
        />
    ) : null;
};
ListTable.propTypes = {
    client: PropTypes.object, // Apollo
    list: PropTypes.shape({
        name: PropTypes.string,
        list_id: PropTypes.number,
        is_archived: PropTypes.bool,
        created_at: PropTypes.string,
        lists: PropTypes.arrayOf(PropTypes.shape({
            list_item_id: PropTypes.number,
            name: PropTypes.string,
            created_at: PropTypes.string,
            is_check: PropTypes.bool,
        }))
    }),
    listToState: PropTypes.func, // Redux update list
};
// // //
// Redux connection
const mapStateToProps = state => ({
    list: state.list, // Current displayed list
    translation: state.lang.translation, // Current location in the app
})

const mapDispatchToProps = dispatch => {
    return {
        listToState: (val) => {
            dispatch(
                updateListAction(val) // Update the lang
            )
        }
    }
}
export default withApollo(connect(mapStateToProps, mapDispatchToProps)(ListTable));