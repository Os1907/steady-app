import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';

export function ScreenBackground() {
  const { colors } = useTheme();

  return (
    <View className="flex-1 bg-background">
      <LinearGradient
        pointerEvents="none"
        colors={[
          colors.backgroundGlow,
          colors.background,
          colors.background,
          colors.backgroundGlow,
        ]}
        locations={[0, 0.3, 0.7, 1]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

