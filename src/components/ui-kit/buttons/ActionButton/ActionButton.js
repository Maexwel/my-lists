import React from 'react';
import { Button, Tooltip, Icon, Fab, IconButton as MaterialIconButton } from '@material-ui/core';
import PropTypes from 'prop-types';

// Base button with theme color as background
// Override of the Button from material-ui
const ActionButton = (props) => {
    const { tip = '', type = 'default', className } = props;

    // Render button based on his type
    const buttonFactory = () => {
        switch (type) {
            case "default":
                return <DefaultButton {...props} />
            case "fab":
                return <FabButton {...props} />
            case "icon":
                return <IconButton {...props} />
            default:
                return <DefaultButton {...props} />
        }
    };

    return (
        <Tooltip
            title={tip}
            placement="bottom">
            <div className={className}>
                {buttonFactory()}
            </div>
        </Tooltip>
    );
};
ActionButton.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    tip: PropTypes.string,
    icon: PropTypes.string, // Icon name
    variant: PropTypes.oneOf(["default", "fab", "icon"]),
    type: PropTypes.string,
    color: PropTypes.oneOf(["primary", "secondary", "default"]),
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};
ActionButton.defaultProps = {
    color: "secondary",
};
export default ActionButton;

// // //
// Default button (Contained button)
const DefaultButton = ({ label, icon, onClick, disabled, className, type, color }) => {
    return (
        <Button
            onClick={onClick}
            variant="contained"
            color={color}
            disabled={disabled}
            className={className}
            type={type}
        >
            {icon && <Icon>{icon}</Icon>}
            {label}
        </Button>
    );
};

// // //
// Floating Action Button
const FabButton = ({ icon, onClick, disabled, className, type }) => {
    return (
        <Fab
            disabled={disabled}
            type={type}
            className={className}
            onClick={onClick}>
            <Icon>
                {icon}
            </Icon>
        </Fab>
    );
};

// // //
// Icon button (button that is an icon)
const IconButton = ({ icon, onClick, disabled, className, type, color }) => {
    return (
        <MaterialIconButton
            disabled={disabled}
            type={type}
            className={className}
            onClick={onClick}
            color={color} >
            <Icon>
                {icon}
            </Icon>
        </MaterialIconButton>
    );
};