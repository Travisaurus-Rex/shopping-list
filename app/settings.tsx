import Button from '@/components/ui/Button';
import ColorPicker from '@/components/ui/ColorPicker';
import TopBar from '@/components/ui/TopBar';
import { MODE_COLORS } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';
import { supabase } from '@/supabase/client'; // adjust path as needed
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { primaryColor, mode, toggleMode } = useTheme();
  const color = MODE_COLORS[mode].text;
  const isDarkMode = mode === 'dark';
  const backgroundColor = MODE_COLORS[mode].background;

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
      // Optionally show a toast or alert here
      return;
    }

    await supabase.auth.signOut();
    router.replace('/auth');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? 'black' : primaryColor }}>
      <TopBar title="Settings" showBack />
      <View style={{ flex: 1, padding: 26, backgroundColor }}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color }]}>Theme Color</Text>
          <ColorPicker />
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color }]}>Dark Mode</Text>
          <Switch style={{ marginBottom: 16 }}
            trackColor={{ false: '#767577', true: primaryColor }} 
            thumbColor={mode == 'dark' ? primaryColor : '#767577'}
            ios_backgroundColor={primaryColor} 
            value={mode === 'dark'}
            onValueChange={toggleMode}
          />
        </View>
        <View style={styles.section}>
           <Button title="Sign Out" onPress={handleSignOut} color="#d9534f" />
        </View>
      </View>
    </SafeAreaView>
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#888',
  },
})
