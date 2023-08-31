import { classNames } from 'shared/lib/classNames/classNames';
import LightIcon from 'shared/assets/icons/light-mode-24x24.svg';
import DarkIcon from 'shared/assets/icons/dark-mode-24x24.svg';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { memo } from 'react';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      className={classNames('', {}, [className])}
      variant={ButtonVariant.CLEAR}
      onClick={toggleTheme}
    >
      {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
    </Button>
  );
});
