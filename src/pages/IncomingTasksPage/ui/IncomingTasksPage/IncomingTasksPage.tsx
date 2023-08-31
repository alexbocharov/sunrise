import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { IncomingTaskPageHeader } from '../IncomingTaskPageHeader/IncomingTaskPageHeader';
import { IncomingTaskPageBody } from '../IncomingTaskPageBody/IncomingTaskPageBody';

// import cls from './IncomingTask.module.scss';

interface IncomingTasksPageProps {
  className?: string;
}

export const IncomingTasksPage = memo((props: IncomingTasksPageProps) => {
  const { className } = props;

  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'Входящие задания';
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <IncomingTaskPageHeader />
      <IncomingTaskPageBody />
    </Box>
  );
});
