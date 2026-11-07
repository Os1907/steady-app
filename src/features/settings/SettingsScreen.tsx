import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import * as Haptics from 'expo-haptics';
import { useEffect, useRef } from 'react';
import { Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme, type ThemePreference } from '../../theme/ThemeProvider';

const appearanceOptions = [
  { value: 'light', title: 'Light', description: 'A warm, light background.' },
  { value: 'dark', title: 'Dark', description: 'Deep black with bright text.' },
  { value: 'system', title: 'System', description: 'Follow your device appearance.' },
] as const satisfies readonly {
  value: ThemePreference;
  title: string;
  description: string;
}[];

function reportFeedbackError(error: unknown) {
  // Feedback is optional: report failures during development without blocking UI.
  if (__DEV__) console.warn('STEADY appearance feedback unavailable:', error);
}

export default function SettingsScreen() {
  const { preference, setPreference } = useTheme();
  const sound = useAudioPlayer(require('../../../assets/audio/theme-change.wav'), {
    downloadFirst: true,
    keepAudioSessionActive: false,
  });
  const soundRequest = useRef(0);

  useEffect(() => {
    // Respect silent mode and mix the short click with any playing music.
    void setAudioModeAsync({
      playsInSilentMode: false,
      interruptionMode: 'mixWithOthers',
    }).catch(reportFeedbackError);

    return () => {
      // Ignore pending playback after this screen is removed.
      soundRequest.current += 1;
    };
  }, []);

  async function playThemeSound() {
    const request = ++soundRequest.current;

    try {
      if (!sound.isLoaded) return;
      sound.pause();
      await sound.seekTo(0);
      if (request !== soundRequest.current) return;
      sound.play();
    } catch (error) {
      reportFeedbackError(error);
    }
  }

  function changeAppearance(nextPreference: ThemePreference) {
    if (nextPreference === preference) return;

    // Apply the theme immediately; feedback must never delay the selection.
    setPreference(nextPreference);

    const feedback = Platform.OS === 'android'
      ? Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Segment_Tick)
      : Haptics.selectionAsync();

    void feedback.catch(reportFeedbackError);
    void playThemeSound();
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 }}
      >
        <Text className="text-xs tracking-[2px] text-muted-foreground">MAKE IT YOURS</Text>
        <Text accessibilityRole="header" className="mt-3 text-[32px] font-medium text-foreground">
          Settings
        </Text>

        <View className="mt-6">
          <Text accessibilityRole="header" className="text-base font-medium text-foreground">
            Appearance
          </Text>
          <Text className="mb-5 mt-2 text-sm leading-5 text-muted-foreground">
            Choose how STEADY looks on your device.
          </Text>

          <View accessibilityRole="radiogroup" accessibilityLabel="App appearance" className="gap-2">
            {appearanceOptions.map((option) => {
              const selected = preference === option.value;

              return (
                <Pressable
                  key={option.value}
                  accessibilityRole="radio"
                  accessibilityLabel={option.title}
                  accessibilityHint={option.description}
                  accessibilityState={{ checked: selected }}
                  onPress={() => changeAppearance(option.value)}
                  className={`min-h-[80px] flex-row items-center gap-4 rounded-2xl px-5 py-4 active:opacity-70 ${selected ? 'bg-surface-pressed' : 'bg-surface'}`}
                >
                  <View className="flex-1">
                    <Text className="text-base font-medium text-foreground">{option.title}</Text>
                    <Text className="mt-1 text-sm leading-5 text-muted-foreground">
                      {option.description}
                    </Text>
                  </View>
                  <View
                    accessible={false}
                    className={`h-5 w-5 items-center justify-center rounded-full border ${selected ? 'border-accent' : 'border-muted-foreground'}`}
                  >
                    {selected && <View className="h-2.5 w-2.5 rounded-full bg-accent" />}
                  </View>
                </Pressable>
              );
            })}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
