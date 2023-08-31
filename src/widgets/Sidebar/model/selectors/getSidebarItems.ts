import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

import InboxIcon from 'shared/assets/icons/list-checks-grid-green-20x20.svg';
// import InboxIcon from 'shared/assets/icons/task-20x20.svg';
import HistoryIcon from 'shared/assets/icons/list-checks-grid-yellow-20x20.svg';
// import HistoryIcon from 'shared/assets/icons/history-20x20.svg';
import NotificationIcon from 'shared/assets/icons/notification-20x20.svg';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    // {
    //   path: RoutePath.main,
    //   text: 'main',
    //   Icon: MainIcon,
    // },
    // {
    //   path: RoutePath.about,
    //   text: 'about',
    //   Icon: AboutIcon,
    // },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: RoutePath.incoming_tasks,
        text: 'incoming-tasks',
        Icon: InboxIcon,
        authOnly: true,
      },
      {
        path: RoutePath.history,
        text: 'history',
        Icon: HistoryIcon,
        authOnly: true,
      },
      {
        path: RoutePath.notifications,
        text: 'notifications',
        Icon: NotificationIcon,
        authOnly: true,
      },
      // {
      //   path: RoutePath.profile + userData.id,
      //   text: 'profile',
      //   Icon: ProfileIcon,
      //   authOnly: true,
      // },
      // {
      //   path: RoutePath.articles,
      //   text: 'articles',
      //   Icon: MainIcon,
      //   authOnly: true,
      // },
    );
  }

  return sidebarItemsList;
});
