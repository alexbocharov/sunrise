import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyIcon from 'shared/assets/icons/key-20x20.svg';
import LogoutIcon from '@mui/icons-material/Logout';
import { User, userActions } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ChangePasswordModal } from 'shared/ui/CustomModal/ChangePasswordModal/ChangePasswordModal';

import AvatarIcon from 'shared/assets/icons/user.png';

import cls from './UserLogo.module.scss';

interface UserLogoProps {
  className?: string;
  authData: User;
}

export const UserLogo = memo((props: UserLogoProps) => {
  const { className, authData } = props;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenChangePasswordModal, setIsOpenChangePasswordModal] =
    useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = useCallback(() => {
    handleClose();
    dispatch(userActions.logout());
  }, [dispatch]);

  const handleChangePassword = useCallback(() => {
    handleClose();
    setIsOpenChangePasswordModal(true);
  }, []);

  const handleCloseChangePassword = useCallback(() => {
    setIsOpenChangePasswordModal(false);
  }, []);

  return (
    <div className={classNames('', {}, [className])}>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={t('user-settings')}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {/* <Avatar sx={{ width: 32, height: 32 }} src={authData.avatar} /> */}
            <img className={cls.avatar} src={AvatarIcon} alt="avatar-user" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* <MenuItem onClick={handleClose} sx={{ fontSize: '14px' }}>
          <Avatar />
          <AppLink
            to={`/profile/${authData.id}`}
            variant={AppLinkVariant.SECONDARY}
          >
            {t('profile')}
          </AppLink>
        </MenuItem>
        <Divider /> */}
        <MenuItem onClick={handleClose} sx={{ fontSize: '14px' }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          {t('settings')}
        </MenuItem>
        <MenuItem onClick={handleChangePassword} sx={{ fontSize: '14px' }}>
          <ListItemIcon>
            <KeyIcon />
          </ListItemIcon>
          {t('change-password')}
        </MenuItem>
        <MenuItem onClick={onLogout} sx={{ fontSize: '14px' }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          {t('logout')}
        </MenuItem>
      </Menu>
      {isOpenChangePasswordModal && (
        <ChangePasswordModal onCloseClick={handleCloseChangePassword} />
      )}
    </div>
  );
});
