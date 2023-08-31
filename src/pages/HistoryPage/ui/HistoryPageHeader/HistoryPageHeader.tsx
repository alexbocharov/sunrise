import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import RefrechIcon from 'shared/assets/icons/refresh.svg';

import { useSelector } from 'react-redux';
import { getTasks, getTasksIsLoading } from 'entities/Task';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchTasksByUserAccessToken } from 'entities/Task/model/services/fetchTasksByUserAccessToken/fetchTasksByUserAccessToken';
import { getUserAuthData } from 'entities/User';

import cls from './HistoryPageHeader.module.scss';

interface IncomingTaskPageHeaderProps {
  className?: string;
}

export const HistoryPageHeader = memo((props: IncomingTaskPageHeaderProps) => {
  const { className } = props;

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const authData = useSelector(getUserAuthData);
  const isLoading = useSelector(getTasksIsLoading);

  const tasksTotal = useSelector(getTasks.selectTotal);

  const title = `${t('history')} (${isLoading ? '-' : tasksTotal})`;

  const handleClick = () => {
    dispatch(
      fetchTasksByUserAccessToken({
        accessToken: authData?.accessToken || '',
      }),
    );
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: 50,
        background: '#fff',
      }}
    >
      <Grid
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          color: '#121416',
          height: '100%',
        }}
      >
        <Box>{title}</Box>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={handleClick}>
          <RefrechIcon className={cls.refrechIcon} />
        </IconButton>
      </Grid>
    </Box>
  );
});
