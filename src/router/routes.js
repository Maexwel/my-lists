import { DashboardPage } from '../components/pages';

export const routes = {
    HOME: {
        icon: 'dashboard', // Material icon name
        path: '/',
        name: 'HOME_PAGE', // It should match a key in the lang file
        exact: true,
        component: DashboardPage,
    },
    MY_LISTS: {
        icon: 'list',
        path: '/lists',
        name: 'LIST_PAGE',
        component: DashboardPage,
    }
}