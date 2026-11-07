import { useColorScheme, vars } from 'nativewind';
import { createContext, useContext, useState, type ReactNode } from 'react';
import { View } from 'react-native';

import { themes, type ThemeColors, type ThemeMode } from './colors';

export type ThemePreference = ThemeMode | 'system';

type ThemeContextValue = {
  preference: ThemePreference;
  mode: ThemeMode;
  colors: ThemeColors;
  setPreference: (preference: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function createThemeStyle(palette: ThemeColors) {
  const variables: Record<`--${string}`, string> = {};

  for (const [role, hex] of Object.entries(palette)) {
    // surfaceElevated -> --color-surface-elevated, matching tailwind.config.js.
    const name = role.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

    // Tailwind's rgb(var(...) / opacity) expects channels, not a hex string.
    variables[`--color-${name}`] = [
      Number.parseInt(hex.slice(1, 3), 16),
      Number.parseInt(hex.slice(3, 5), 16),
      Number.parseInt(hex.slice(5, 7), 16),
    ].join(' ');
  }

  return vars(variables);
}

// Convert each palette once, rather than on every render.
const themeStyles = {
  light: createThemeStyle(themes.light),
  dark: createThemeStyle(themes.dark),
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [preference, setStoredPreference] = useState<ThemePreference>('system');
  const mode: ThemeMode = preference === 'system' ? (colorScheme ?? 'dark') : preference;

  function setPreference(nextPreference: ThemePreference) {
    // Keep NativeWind's dark: utilities in sync with the semantic variables.
    setColorScheme(nextPreference);
    setStoredPreference(nextPreference);
  }

  return (
    <ThemeContext.Provider
      value={{ preference, mode, colors: themes[mode], setPreference }}
    >
      <View className="flex-1 bg-background" style={themeStyles[mode]}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('useTheme must be used inside ThemeProvider.');
  }

  return theme;
}
