import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

interface ThemedTextInputProps extends TextInputProps {
  secure?: boolean;
}

export default function ThemedTextInput({
  secure = false,
  style,
  ...rest
}: ThemedTextInputProps) {
  const { mode } = useTheme();
  const [isHidden, setIsHidden] = useState(true);

  const toggleVisibility = () => setIsHidden(!isHidden);

  const backgroundColor = mode === 'dark' ? '#1e1e1e' : '#f0f0f0';
  const textColor = mode === 'dark' ? '#fff' : '#000';
  const borderColor = mode === 'dark' ? '#555' : '#ccc';
  const placeholderColor = mode === 'dark' ? '#aaa' : '#666';

  return (
    <View style={[styles.inputContainer, { backgroundColor, borderColor }]}>
      <TextInput
        style={[styles.input, { color: textColor }, style]}
        placeholderTextColor={placeholderColor}
        secureTextEntry={secure && isHidden}
        autoCapitalize="none"
        {...rest}
      />
      {secure && (
        <View pointerEvents="box-none" style={styles.iconContainer}>
          <TouchableOpacity onPress={toggleVisibility} hitSlop={10}>
            <Ionicons
              name={isHidden ? 'eye-off' : 'eye'}
              size={20}
              color={mode === 'dark' ? '#ccc' : '#333'}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginVertical: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  iconContainer: {
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
