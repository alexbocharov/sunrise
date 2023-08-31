import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from 'shared/const/localstorage';
import {
  Theme,
  ThemeContext,
} from '../ui/ThemeProvider';

interface UseThemeReturn {
  theme: Theme;
  toggleTheme: () => void;
}

export function useTheme(): UseThemeReturn {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    let newTheme: Theme;

    switch (theme) {
    case Theme.DARK:
      newTheme = Theme.LIGHT;
      break;
    case Theme.LIGHT:
      newTheme = Theme.ORANGE;
      break;
    case Theme.ORANGE:
      newTheme = Theme.DARK;
      break;
    default:
      newTheme = Theme.LIGHT;
      break;
    }

    // document.body.className = newTheme;

    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    setTheme?.(newTheme);
  };

  return {
    theme: theme || Theme.LIGHT,
    toggleTheme,
  };
}
