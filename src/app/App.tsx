import { getUserAuthData, getUserInited, userActions } from 'entities/User';
import { Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar/ui';
import { LoginPage } from 'pages/LoginPage/ui/LoginPage';
import { Box } from '@mui/material';
import { AppRouter } from './providers/router';
import { useTheme } from './providers/ThemeProvider';

import './styles/index.scss';

export const App = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const inited = useSelector(getUserInited);
  const authData = useSelector(getUserAuthData);

  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  if (location.pathname === '/login' && authData) {
    return <Navigate to={RoutePath.incoming_tasks} state={{ from: location }} replace />;
  }

  if (location.pathname === '/login' && !authData) {
    return (
      <div className={classNames('app', {}, [theme])}>
        <Suspense fallback="...">
          <LoginPage />
        </Suspense>
      </div>
    );
  }

  if (!authData) {
    return <Navigate to={RoutePath.login} state={{ from: location }} replace />;
  }

  return (
    <Box className={classNames('app', {}, [theme])}>
      <Suspense fallback="...">
        <Navbar collapsed={collapsed} onToggle={onToggle} />
        <div className="content-page">
          <Sidebar open={!collapsed} />
          {inited && <AppRouter />}
        </div>
      </Suspense>
    </Box>
  );
};
