import { NativeTabs } from 'expo-router/native-tabs';
import { DynamicColorIOS, Platform } from 'react-native';

import { themes } from '../../theme/colors';
import { useTheme } from '../../theme/ThemeProvider';

export type NavigationTab = 'profile' | 'progress' | 'home' | 'workouts';

type BottomNavigationProps = {
  // Include a tab only after its corresponding route file exists.
  availableTabs?: readonly NavigationTab[];
};

const tabs = [
  { id: 'home', route: 'index', label: 'Home', icon: 'house', selectedIcon: 'house.fill' },
  { id: 'profile', route: 'profile', label: 'Profile', icon: 'person', selectedIcon: 'person.fill' },
  { id: 'progress', route: 'progress', label: 'Progress', icon: 'chart.bar', selectedIcon: 'chart.bar.fill' },
  { id: 'workouts', route: 'workouts', label: 'Workouts', icon: 'calendar', selectedIcon: 'calendar' },
] as const;

export function BottomNavigation({ availableTabs = ['home'] }: BottomNavigationProps) {
  const { colors } = useTheme();

  // iOS can adapt the glass bar to the content behind it independently.
  const foreground = Platform.OS === 'ios'
    ? DynamicColorIOS({ light: themes.light.foreground, dark: themes.dark.foreground })
    : colors.foreground;
  const secondary = Platform.OS === 'ios'
    ? DynamicColorIOS({ light: themes.light.mutedForeground, dark: themes.dark.mutedForeground })
    : colors.mutedForeground;

  return (
    <NativeTabs
      tintColor={foreground}
      iconColor={{ default: secondary, selected: foreground }}
      labelStyle={{
        default: { color: secondary, fontSize: 11 },
        selected: { color: foreground, fontSize: 11 },
      }}
      backgroundColor={colors.surface}
      minimizeBehavior="never"
    >
      {tabs.filter((tab) => availableTabs.includes(tab.id)).map((tab) => (
        <NativeTabs.Trigger
          key={tab.id}
          name={tab.route}
          prominent={tab.id === 'workouts'}
          contentStyle={{ backgroundColor: colors.background }}
          disableTransparentOnScrollEdge
        >
          <NativeTabs.Trigger.Icon
            sf={{ default: tab.icon, selected: tab.selectedIcon }}
          />
          <NativeTabs.Trigger.Label>{tab.label}</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}
