// components/ColorDebug.tsx
import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ColorDebug() {
  const { primaryColor } = useTheme();
  return <Text style={{ textAlign: 'center' }}>Theme color: {primaryColor}</Text>
}
