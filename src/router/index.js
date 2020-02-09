import React from 'react';
import { routes as ROUTES } from './routes';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Page from '../components/pages/templates/Page';
import { NotFoundPage } from '../components/pages'

// Routes of the app in a Switch to handle multiple route matching
const routes = () => (
    <BrowserRouter>
        <Switch>
            {/** Map each route defined in the routes.js file */}
            {ROUTES.filter(route => !route.hidden).map((route, key) => (
                <Page key={key} {...route} />
            ))}
            {/** Login route */}
            <Route {...ROUTES.find(r => r.path === "/login")} />
            {/** Handle page not found */}
            <Route component={NotFoundPage} />
        </Switch>
    </BrowserRouter>
);
export default routes;