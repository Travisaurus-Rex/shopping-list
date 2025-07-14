import { Ionicons } from '@expo/vector-icons';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

function renderRightActions(
  progress: Animated.AnimatedInterpolation<number>,
  dragX: Animated.AnimatedInterpolation<number>,
  onDelete: () => void
) {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <TouchableOpacity onPress={onDelete} activeOpacity={0.6}>
      <Animated.View style={[styles.deleteButton, { transform: [{ scale }] }]}>
        <Ionicons name="trash-outline" size={24} color="white" />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: '100%',
  },
});

