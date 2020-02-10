import React from 'react';
import PropTypes from 'prop-types';

// Item to display values in the dashboard such as number of items
const DashboardItem = ({ onClick, count = 0 }) => {

    return (
        <div></div>
    )
};
DashboardItem.propTypes = {
    count: PropTypes.number,
    onClick: PropTypes.func,
};
export default DashboardItem;