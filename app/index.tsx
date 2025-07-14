import TopBar from '@/components/ui/TopBar';
import { MODE_COLORS } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { primaryColor, mode } = useTheme();
  const color = MODE_COLORS[mode].text;
  const backgroundColor = MODE_COLORS[mode].background;

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor }}>
      <TopBar title="Home" />
    </View>
  )
}

const styles = StyleSheet.create({
  iconButton: {
    padding: 10,
    position: 'absolute',
    top: 0,
    right: 0
  },
})
