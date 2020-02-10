import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { DataTable } from '../ui-kit';
import { ServiceLocatorContext } from '../context';

// DataTable configured for the list items with actions
const ListTable = ({ title, list = {} }) => {
    const { } = useContext(ServiceLocatorContext);

    // onInit
    useEffect(() => {

    }, []);

    // load list data using list_id value
    const loadList = () => {

    };

    return (
        <DataTable
            checkable={false}
            data={list.items}
            title={title}

        />
    );
};
ListTable.propTypes = {
    title: PropTypes.string,
    list: PropTypes.shape({
        name: PropTypes.string,
        list_id: PropTypes.number,
        isArchived: PropTypes.bool,
        items: PropTypes.arrayOf(PropTypes.shape({
            list_item_id: PropTypes.number,
        }))
    }),
};