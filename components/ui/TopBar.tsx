import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
}

export default function TopBar({ title, showBack = false }: TopBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { mode, primaryColor } = useTheme();
  const isDarkMode = mode === 'dark';
  const isOnSettingsPage = pathname === '/settings';

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : primaryColor }]}>
      {showBack ? (
        <Pressable onPress={router.back} style={styles.iconWrapper}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? primaryColor : '#fff'} />
        </Pressable>
      ) : (
        <View style={styles.iconWrapper} />
      )}

      <Text style={[styles.title, { color: '#fff' }]}>{title}</Text>

      {!isOnSettingsPage ? (
        <Pressable onPress={() => router.push('/settings')} style={styles.iconWrapper}>
          <Ionicons name="person" size={24} color={isDarkMode ? primaryColor : '#fff'} />
        </Pressable>
      ) : (
        <View style={styles.iconWrapper} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#888',
    // shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // shadow for Android
    elevation: 3,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
})
