/** Semantic color roles shared by both themes. */
export const lightColors = {
  background: '#f7f7f2',
  surface: '#eaeae6',
  surfaceElevated: '#ffffff',
  surfacePressed: '#ddddd8',
  foreground: '#111111',
  mutedForeground: '#60605c',
  border: '#cececa',
  accent: '#ef2929',
  onAccent: '#000000',
  backgroundGlow: '#f4dfe2',
  progressTrack: '#d7d7d2',
} as const;

export type ThemeColors = {
  readonly [Role in keyof typeof lightColors]: string;
};

export const darkColors = {
  background: '#000000',
  surface: '#171717',
  surfaceElevated: '#242424',
  surfacePressed: '#303030',
  foreground: '#ffffff',
  mutedForeground: '#a3a3a3',
  border: '#383838',
  accent: '#ef2929',
  onAccent: '#000000',
  backgroundGlow: '#220307',
  progressTrack: '#303030',
} as const satisfies ThemeColors;

export const themes = {
  light: lightColors,
  dark: darkColors,
} as const;

export type ThemeMode = keyof typeof themes;

// Preserve the existing background until theme selection is connected.
export const colors = darkColors;
