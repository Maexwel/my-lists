import { DashboardPage, LoginPage } from '../components/pages';

export const routes = [
    {
        icon: 'dashboard', // Material icon name
        path: '/',
        name: 'HOME_PAGE', // It should match a key in the lang file
        exact: true,
        component: DashboardPage,
    },
    {
        icon: 'list',
        path: '/lists',
        name: 'LIST_PAGE',
        component: DashboardPage,
    },
    {
        hidden: true,
        exact: true,
        path: '/login',
        component: LoginPage,
    }
];