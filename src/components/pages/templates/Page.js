import React, { useEffect, useContext } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, Grid, AppBar, Toolbar, Tooltip, List, ListItemText, ListItemIcon, ListItem, IconButton, Divider, CssBaseline, Typography, Icon } from '@material-ui/core';
import { connect } from 'react-redux';
import { updateViewAction } from '../../../store/actions/viewActions';
import { withRouter } from 'react-router-dom';
import { Auth } from '../../Auth';
import { ActionButton } from '../../ui-kit';
import { Version } from '../../Version';
import { setUserAction } from '../../../store/actions/userActions';
import { ServiceLocatorContext } from '../../context';

const drawerWidth = 220;

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        selectedListItem: {
            color: theme.palette.primary.main,
            background: theme.palette.grey[200]
        },
        fullWidth: {
            width: '100%',
        },
        fullHeight: {
            height: '100%',
        },
        version: {
            padding: theme.spacing(1),
            fontSize: 15,
            textAlign: 'center',
        },
        appName: {
            fontSize: 20,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            backgroundColor: theme.palette.secondary.main,
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            color: 'white'
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: 0, // The drawer close isn't displayed if sm
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(8),
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            background: theme.palette.secondary.main,
            color: theme.palette.common.white,
        },
        toolbarIcon: {
            color: theme.palette.common.white,
        },
        content: {
            padding: theme.spacing(2),
            marginTop: theme.spacing(8),
            width: "100%"
        },
    }),
);
// Base Page template of the application
const Page = (props) => {
    const { component: Component, path, name, displayText, viewToState, currentPage, history, translation, user, userToState } = props; // Component to inject
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const { localStorageManager } = useContext(ServiceLocatorContext);

    useEffect(() => {
        viewToState({ currentPage: { path, name, displayText } }); // set the current page (route = { path: '/', name: '/' })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path, name])

    // Main menu's linksS
    const links = [
        {
            icon: 'dashboard', // Material icon name
            path: '/',
            name: 'DASHBOARD_PAGE', // It should match a key in the lang file
        },
        {
            icon: 'list',
            path: '/lists',
            name: 'LIST_PAGE',
        },
    ];

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // Handle log out request
    const handleLogOut = async () => {
        await localStorageManager.clear(); // remove user from local storage
        userToState({});
        history.push('/login');
    };

    return (
        <Auth isAuth={user.app_user_id && user.app_user_id !== null} loginPath="/login">
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                    color="primary">
                    <Toolbar>
                        <Grid
                            justify="space-between"
                            alignItems="center"
                            container>
                            <Grid item>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    className={clsx(classes.menuButton, {
                                        [classes.hide]: open,
                                    })}
                                >
                                    <Icon>menu</Icon>
                                </IconButton>
                            </Grid>
                            {/** APP NAME */}
                            <Grid item>
                                <ActionButton
                                    className={classes.appName}
                                    color="inherit"
                                    label={translation["APP_NAME"]}
                                    buttonVariant="text"
                                    onClick={() => history.push('/')} />
                            </Grid>
                            {/** LOGOUT */}
                            <Grid item>
                                <ActionButton
                                    tip={translation["LOGOUT_TIP"]}
                                    variant="icon"
                                    icon="exit_to_app"
                                    color="inherit"
                                    onClick={handleLogOut} />
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                {/** LEFT MENU */}
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                    open={open}>
                    <div className={classes.toolbar}>
                        <Typography component="h5">
                            {translation["DRAWER_TITLE"]}
                        </Typography>
                        <IconButton className={classes.toolbarIcon} onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <Icon>chevron_right</Icon> : <Icon>chevron_left</Icon>}
                        </IconButton>
                    </div>
                    <Divider />
                    <Grid
                        className={classes.fullHeight}
                        container
                        direction="column"
                        justify="space-between">
                        {/** LINKS */}
                        <Grid
                            className={classes.fullWidth}
                            item>
                            <List>
                                {currentPage ?
                                    links.map((link, index) => (
                                        <DrawerLink
                                            key={index}
                                            {...link}
                                            displayText={translation[link.name]}
                                            isCurrent={currentPage.name === link.name}
                                            history={history}
                                            drawerOpen={open} />
                                    )) : null}
                            </List>
                        </Grid>
                        {/** APP Version */}
                        <Grid
                            className={classes.fullWidth}
                            item>
                            <React.Fragment>
                                <Divider />
                                {open &&
                                    <Version className={classes.version} />}
                            </React.Fragment>
                        </Grid>
                    </Grid>
                </Drawer>
                <div className={classes.content}>
                    {/** Component injection */}
                    <Component {...props} />
                </div>
            </div>
        </Auth>
    )
}
// // // 
// Redux connexion
const mapStateToProps = state => ({
    currentPage: state.view.currentPage, // Current location in the app
    translation: state.lang.translation, // Content translated
    user: state.user, // Auth user of the app
})

const mapDispatchToProps = dispatch => {
    return {
        viewToState: (val) => {
            dispatch(
                updateViewAction(val) // Update the view
            )
        },
        userToState: (val) => {
            dispatch(
                setUserAction(val)
            )
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Page));

// // //
// Link displayed in the drawer
const DrawerLink = ({ path, icon, isCurrent, history, drawerOpen, displayText = '' }) => {

    const navigationClicked = (path) => {
        history.push(path); // Redirect to "path"
    }

    const classes = useStyles();
    return drawerOpen ?
        (<ListItem
            className={clsx({ [classes.selectedListItem]: isCurrent })}
            onClick={() => navigationClicked(path)}
            button>
            <ListItemIcon
                className={clsx({ [classes.selectedListItem]: isCurrent })}>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText
                className={clsx({ [classes.selectedListItem]: isCurrent })}
                primary={displayText} />
        </ListItem>) :
        (<Tooltip
            title={displayText}
            placement="right">
            <ListItem
                className={clsx({ [classes.selectedListItem]: isCurrent })}
                onClick={() => navigationClicked(path)}
                button>
                <ListItemIcon
                    className={clsx({ [classes.selectedListItem]: isCurrent })}>
                    <Icon>{icon}</Icon>
                </ListItemIcon>
                <ListItemText
                    className={clsx({ [classes.selectedListItem]: isCurrent })}
                    primary={displayText} />
            </ListItem>
        </Tooltip>)
}