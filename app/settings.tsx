import Button from '@/components/ui/Button';
import ColorPicker from '@/components/ui/ColorPicker';
import TopBar from '@/components/ui/TopBar';
import { MODE_COLORS } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';
import { supabase } from '@/supabase/client'; // adjust path as needed
import { RootParamList } from '@/types/Navigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default function SettingsScreen() {
  const { primaryColor, mode, toggleMode } = useTheme();
  const color = MODE_COLORS[mode].text;
  const backgroundColor = MODE_COLORS[mode].background;
type SettingsScreenNavigationProp = NativeStackNavigationProp<RootParamList, 'Settings'>;

const navigation = useNavigation<SettingsScreenNavigationProp>();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
      // Optionally show a toast or alert here
      return;
    }
    // Navigate user to auth/login screen after sign out
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }], // adjust this route name to your login screen
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <TopBar title="Settings" showBack />
      <View style={{ padding: 26 }}>
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
