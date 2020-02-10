import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Page from '../components/pages/templates/Page';
import { NotFoundPage } from '../components/pages';
import { DashboardPage, LoginPage } from '../components/pages';

// Routes of the app in a Switch to handle multiple route matching
const routes = () => (
    <BrowserRouter>
        <Switch>
            {/** DASHBOARD */}
            <Page
                icon='dashboard'
                path='/'
                name='DASHBOARD_PAGE'
                exact
                component={DashboardPage} />
            <Page
                icon='dashboard'
                path='/dashboard'
                name='DASHBOARD_PAGE'
                exact
                component={DashboardPage} />
            {/** LISTS */}
            <Page
                icon='list'
                path='/lists'
                name='LIST_PAGE'
                exact
                component={DashboardPage} />
            {/** LOGIN */}
            <Route
                exact
                path="/login"
                component={LoginPage} />
            {/** Handle page not found */}
            <Route component={NotFoundPage} />
        </Switch>
    </BrowserRouter>
);
export default routes;