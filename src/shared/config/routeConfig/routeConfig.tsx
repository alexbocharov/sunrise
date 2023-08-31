import { HistoryPage } from 'pages/HistoryPage';
import { IncomingTasksPage } from 'pages/IncomingTasksPage';
import { LoginPage } from 'pages/LoginPage/ui/LoginPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { NotificationsPage } from 'pages/NotificationsPage';
import { ProfilePage } from 'pages/ProfilePage';
import { RouteProps } from 'react-router-dom';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
}

export enum AppRoutes {
  // MAIN = 'main',
  INCOMING_TASKS = 'incoming_tasks',
  HISTORY = 'history',
  NOTIFICATIONS = 'notifications',
  PROFILE = 'profile',
  LOGIN = 'login',

  // last
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  // [AppRoutes.MAIN]: '/',
  [AppRoutes.INCOMING_TASKS]: '/',
  [AppRoutes.HISTORY]: '/history',
  [AppRoutes.NOTIFICATIONS]: '/notifications',
  [AppRoutes.PROFILE]: '/profile/', // + id
  [AppRoutes.LOGIN]: '/login', // + :id
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.INCOMING_TASKS]: {
    path: RoutePath.incoming_tasks,
    element: <IncomingTasksPage />,
    authOnly: true,
  },
  [AppRoutes.HISTORY]: {
    path: RoutePath.history,
    element: <HistoryPage />,
    authOnly: true,
  },
  [AppRoutes.NOTIFICATIONS]: {
    path: RoutePath.notifications,
    element: <NotificationsPage />,
    authOnly: true,
  },
  [AppRoutes.PROFILE]: {
    path: `${RoutePath.profile}:id`,
    element: <ProfilePage />,
    authOnly: true,
  },
  [AppRoutes.LOGIN]: {
    path: `${RoutePath.login}`,
    element: <LoginPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
