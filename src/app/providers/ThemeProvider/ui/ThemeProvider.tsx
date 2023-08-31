import {
  FC, useMemo, useState, createContext,
} from 'react';
import { LOCAL_STORAGE_THEME_KEY } from 'shared/const/localstorage';

export enum Theme {
  LIGHT = 'app_light_theme',
  DARK = 'app_dark_theme',
  ORANGE = 'app_orange_theme',
}

export interface ThemeContextProps {
  theme?: Theme;
  setTheme?: (theme: Theme) => void;
}

interface ThemeProviderProps {
  initialTheme?: Theme;
}

export const ThemeContext = createContext<ThemeContextProps>({});

const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme)
  || Theme.LIGHT;

// document.body.className = defaultTheme;

const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  const {
    initialTheme,
    children,
  } = props;

  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

  const defaultValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={defaultValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
