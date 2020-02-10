import 'core-js';
import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie11'; // polyfills
import 'typeface-roboto'; // Font
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles'; // Design system provider
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'; // Redux provider
import { theme } from './theme/theme'; // Custom theme
import storeFactory from './store/index'; // Redux store factory
import Router from './router/index.js'; // Main router
import { ServiceLocatorProvider, baseServiceLocator } from './components/context'; // Service locator definition
import { LangProvider } from './components/LangPicker'; // Lang provider
import { LANG_DATA } from './lang';
import { NotificationProvider } from './components/ui-kit'; // Notification provider
import { MuiPickersUtilsProvider, } from '@material-ui/pickers'; // Picker util provider
import MomentUtils from '@date-io/moment'; // Moment utility for pickers
// Apollo
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
require('dotenv').config();

const store = storeFactory();

// Apollo client setup
const createApolloClient = (authToken) => {
    return new ApolloClient({
        link: new HttpLink({
            uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
            headers: {
                "content-type": "application/json"
            }
        }),
        cache: new InMemoryCache(),
    });
};
const client = createApolloClient(""); // GraphQL Client

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <ServiceLocatorProvider value={baseServiceLocator}>
                    <LangProvider data={LANG_DATA}>
                        <NotificationProvider >
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <Router />
                            </MuiPickersUtilsProvider>
                        </NotificationProvider>
                    </LangProvider>
                </ServiceLocatorProvider>
            </ThemeProvider>
        </Provider>
    </ApolloProvider>
    , document.getElementById('root'));
serviceWorker.unregister();
