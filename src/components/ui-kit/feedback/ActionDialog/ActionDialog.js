import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogActions, DialogTitle, Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ActionButton } from '../../';

// Style def
const useStyles = makeStyles((theme) =>
    createStyles({
        head: {
            background: theme.palette.primary.main,
            color: theme.palette.common.white,
        },
        close: {
            color: theme.palette.common.white,
        }
    })
);
// Custom ActionDialog component
// The dialog should contain a header, a body (that is a component) and a footer with actions
// This component is usefull for form dialog purpose or to show message
// Override of Material Dialog
const ActionDialog = ({ isOpen, toggle, title, children, onCancel, onSubmit, fullScreen = true, action = true, cancelLabel = "", submitDisabled = false, submitLabel = "" }) => {
    const classes = useStyles();

    return (
        <Dialog
            fullScreen={fullScreen}
            scroll="paper"
            open={isOpen}
            onClose={toggle}>
            {/** HEAD */}
            <DialogTitle className={classes.head}>
                <Grid
                    container
                    justify="space-between"
                    alignItems="center">
                    <Grid item>
                        {title}

                    </Grid>
                    <Grid item>
                        <ActionButton
                            variant="icon"
                            icon="close"
                            onClick={onCancel}
                            className={classes.close} />

                    </Grid>
                </Grid>
            </DialogTitle>
            {/** BODY */}
            <DialogContent dividers>
                {children}
            </DialogContent>
            {/** FOOTER (actions) */}
            {action &&
                <DialogActions>
                    <ActionButton color="default" label={cancelLabel} onClick={onCancel} />
                    <ActionButton disabled={submitDisabled} label={submitLabel} onClick={onSubmit} color="primary" />
                </DialogActions>}
        </Dialog>
    );
};
ActionDialog.propTypes = {
    children: PropTypes.node.isRequired, // Children is the body of the Dialog.
    toggle: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string,
    cancelLabel: PropTypes.string,
    submitLabel: PropTypes.string,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    submitDisabled: PropTypes.bool,
    action: PropTypes.bool, // Determine if the dialog should display a footer with actions buttons
    fullScreen: PropTypes.bool,
};
export default ActionDialog;