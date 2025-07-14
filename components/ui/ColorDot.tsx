import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  color: string;
  active: boolean;
  isDarkMode: boolean;
}

export default function ColorDot({ color, active, isDarkMode }: Props) {
  return (
    <View
      style={[
        styles.dot,
        { backgroundColor: color },
        active
          ? {
              borderWidth: 3,
              borderColor: isDarkMode ? '#fff' : '#000',
            }
          : {
              borderWidth: 1,
              borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  dot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    margin: 6,
  },
})
