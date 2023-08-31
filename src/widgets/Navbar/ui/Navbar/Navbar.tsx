import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUserName';
import { getUserAuthData } from 'entities/User';
import { useSelector } from 'react-redux';
import Grid from '@mui/system/Unstable_Grid';
import { Box } from '@mui/material';
import { OrganizationInfo } from '../OrganizationInfo/OrganizationInfo';
import { UserLogo } from '../UseLogo/UserLogo';
import { UserInfo } from '../UserInfo/UserInfo';

import { SwitchButton } from '../SwitchButton/SwitchButton';
import { Logo } from '../Logo/Logo';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
  collapsed: boolean;
  onToggle: () => void;
}

export const Navbar = memo((props: NavbarProps) => {
  const { className, collapsed, onToggle } = props;

  const { t } = useTranslation();

  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  if (authData) {
    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '232px 1fr 308px',
          px: 1,
          py: 1,
          background: '#13406d',
        }}
      >
        <Grid sx={{ display: 'flex', color: 'white', width: '232px' }}>
          <SwitchButton toggleClick={onToggle} />
          <Logo collapsed={collapsed} />
        </Grid>

        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
          }}
        >
          <OrganizationInfo />
        </Grid>

        <Grid
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <UserInfo authData={authData} />
          <UserLogo authData={authData} />
        </Grid>
      </Box>
    );
  }

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <Button
        className={cls.links}
        variant={ButtonVariant.CLEAR_INVERTED}
        onClick={onShowModal}
      >
        {t('login')}
      </Button>
      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
});
