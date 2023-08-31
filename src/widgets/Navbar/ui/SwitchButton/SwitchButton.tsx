import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import HamburgerIcon from 'shared/assets/icons/hamburger.svg';
import IconButton from '@mui/material/IconButton';

import cls from './SwitchButton.module.scss';

interface SwitchButtonProps {
  className?: string;
  toggleClick: () => void;
}

export const SwitchButton = memo((props: SwitchButtonProps) => {
  const {
    className,
    toggleClick,
  } = props;

  const { t } = useTranslation();

  return (
    <div className={classNames(cls.SwitchButton, {}, [className])}>
      <IconButton onClick={toggleClick}>
        <HamburgerIcon />
      </IconButton>
    </div>
  );
});
