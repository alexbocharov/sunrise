import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import IconButton from '@mui/material/IconButton';
// import LogoWhiteIcon from 'shared/assets/icons/logo-new-178x26.svg';
import LogoIcon from 'shared/assets/icons/logo.png';

import { NavLink } from 'react-router-dom';
import cls from './Logo.module.scss';

interface LogoProps {
  className?: string;
  collapsed: boolean;
}

export const Logo = memo((props: LogoProps) => {
  const { className, collapsed } = props;

  const { t } = useTranslation();

  // if (collapsed) {
  //   return null;
  // }

  return (
    <div className={classNames(cls.AppName, {}, [className])}>
      <IconButton>
        <NavLink to="/">
          <img src={LogoIcon} alt="logo-icon" width={124} height={24} />
        </NavLink>
      </IconButton>
    </div>
  );
});
