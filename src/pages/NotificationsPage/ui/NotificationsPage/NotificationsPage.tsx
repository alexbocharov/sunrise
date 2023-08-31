import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { NotificationsPageBody } from '../NotificationsPageBody/NotificationsPageBody';
import { NotificationsPageHeader } from '../NotificationsPageHeader/NotificationsPageHeader';
// import cls from './NotificationsPaga.module.scss';

interface NotificationsPageProps {
  className?: string;
}

export const NotificationsPage = memo((props: NotificationsPageProps) => {
  const { className } = props;

  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'Уведомления';
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <NotificationsPageHeader />
      <NotificationsPageBody />
    </Box>
  );
});
