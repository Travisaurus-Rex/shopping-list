import ColorPicker from '@/components/ui/ColorPicker';
import { MODE_COLORS } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default function SettingsScreen() {
  const { mode, toggleMode } = useTheme();
  const color = MODE_COLORS[mode].text;
  const backgroundColor = MODE_COLORS[mode].background;
  return (
    <View style={{ flex: 1, padding: 24, backgroundColor }}>
      <Text style={[styles.title, { color }]}>Settings</Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color }]}>Theme Color</Text>
        <ColorPicker />
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color }]}>Dark Mode</Text>
        <Switch
          value={mode === 'dark'}
          onValueChange={toggleMode}
        />
      </View>

      {/* Future settings sections here */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color }]}>More settings coming soon...</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 18, marginBottom: 12 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
})
