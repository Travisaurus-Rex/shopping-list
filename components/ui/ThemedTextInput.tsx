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
  secure?: boolean; // triggers the toggle
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

  return (
    <View style={[styles.inputContainer, { backgroundColor, borderColor }]}>
      <TextInput
        style={[styles.input, { color: textColor }]}
        placeholderTextColor={mode === 'dark' ? '#aaa' : '#666'}
        secureTextEntry={secure ? isHidden : false}
        {...rest}
      />
      {secure && (
        <TouchableOpacity onPress={toggleVisibility}>
          <Ionicons
            name={isHidden ? 'eye-off' : 'eye'}
            size={20}
            color={mode === 'dark' ? '#ccc' : '#333'}
            style={styles.icon}
          />
        </TouchableOpacity>
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
    flexGrow: 1,
  },
  input: {
    paddingVertical: 10,
    fontSize: 16,
  },
  icon: {
    marginLeft: 8,
  },
});
