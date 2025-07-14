import { useTheme } from '@/context/ThemeContext'; // adjust import to your setup
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

interface ThemedTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: object;
}

export default function ThemedTextInput({ value, onChangeText, placeholder, style }: ThemedTextInputProps) {
  const { mode, primaryColor } = useTheme();

  const isDark = mode === 'dark';

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={isDark ? '#ccc' : '#666'}
      style={[
        styles.input,
        {
          backgroundColor: isDark ? '#222' : '#fff',
          color: isDark ? '#fff' : '#000',
          borderColor: isDark ? primaryColor : '#ccc',
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
});
