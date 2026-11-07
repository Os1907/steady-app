import { NativeTabs } from 'expo-router/native-tabs';
import { DynamicColorIOS, Platform } from 'react-native';

import { themes } from '../../theme/colors';
import { useTheme } from '../../theme/ThemeProvider';

export default function TabsLayout() {
  const { colors } = useTheme();
  const foreground = Platform.OS === 'ios'
    ? DynamicColorIOS({ light: themes.light.foreground, dark: themes.dark.foreground })
    : colors.foreground;

  return (
    <NativeTabs
      tintColor={foreground}
      backgroundColor={colors.surface}
      minimizeBehavior="never"
      labelStyle={{ fontSize: 11 }}
    >
      <NativeTabs.Trigger
        name="index"
        contentStyle={{ backgroundColor: colors.background }}
        disableTransparentOnScrollEdge
      >
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} />
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger
        name="settings"
        contentStyle={{ backgroundColor: colors.background }}
        disableTransparentOnScrollEdge
      >
        <NativeTabs.Trigger.Icon sf={{ default: 'gearshape', selected: 'gearshape.fill' }} />
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
