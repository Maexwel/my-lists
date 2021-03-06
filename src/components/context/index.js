import { LocalStorageManager, NotificationFactory } from '../../util';
import { LangManager } from '../../lang';
import { LoginService, UserService, ListService } from '../../service';
export { default as ServiceLocatorContext, ServiceLocatorProvider, ServiceLocatorConsumer } from './ServiceLocatorContext';

export const baseServiceLocator = {
    // Manager from util folder
    localStorageManager: new LocalStorageManager(), // Local storage manager to handle async call to localstorage
    langManager: new LangManager(), // Lang manager to handle translations
    notificationFactory: new NotificationFactory(), // Notification factory to create and handle notification objects
    // GRAPHQL SERVICES
    loginService: new LoginService(),
    userService: new UserService(),
    listService: new ListService(),
}; // base values for the service locator