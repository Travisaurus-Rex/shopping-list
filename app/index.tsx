import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { primaryColor } = useTheme();

  return (
    <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/settings')}>
      <Ionicons name="settings" size={28} color={primaryColor} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iconButton: {
    padding: 10,
    alignSelf: 'flex-end'
  },
})
