import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { getSidebarItems } from 'widgets/Sidebar/model/selectors/getSidebarItems';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { CSSObject, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  className?: string;
  open: boolean;
}

const useStyles = makeStyles({});

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  // top: '80px',
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  // top: '80px',
  width: `calc(${theme.spacing(6)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(7)} - 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop: string) => prop !== 'open',
})(({ theme, open }: { theme: Theme; open: boolean }) => ({
  width: drawerWidth,
  height: 'calc(100vh - 80px)',
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const Sidebar = memo((props: SidebarProps) => {
  const { className, open } = props;

  const { t } = useTranslation();

  const sidebarItemsList = useSelector(getSidebarItems);
  const styles = useStyles();

  const [active, setActive] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          background: '#ecedf0',
          position: 'relative',
        },
      }}
    >
      <List sx={{ px: 0, py: 0 }}>
        {sidebarItemsList.map((item, index) => (
          <ListItem
            key={item.path}
            disablePadding
            sx={{ display: 'block', px: 0, py: 0 }}
          >
            <ListItemButton
              sx={{
                height: 40,
                justifyContent: 'left',
                px: 2,
                background:
                  active === item.path ? 'rgba(0, 0, 0, 0.1)' : 'inherits',
              }}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 0,
                  justifyContent: 'center',
                  width: '20px',
                  height: '20px',
                }}
              >
                <item.Icon width="20px" height="20px" />
              </ListItemIcon>
              <ListItemText
                primary={t(item.text)}
                sx={{
                  opacity: open ? 1 : 0,
                  '& .MuiTypography-root': { fontSize: 14 },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
});

// <menu
//   data-testid="sidebar"
//   className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
//     className,
//   ])}
// >
//   <div className={cls.items}>
//     {sidebarItemsList.map((item) => (
//       <SidebarItem
//         key={item.path}
//         item={item}
//         collapsed={collapsed}
//       />
//     ))}
//   </div>

//   <div className={cls.switchers}>
//     <ThemeSwitcher />
//     <LanguageSwitcher className={cls.lang} short={collapsed} />
//   </div>
// </menu>
