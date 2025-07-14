import { MODE_COLORS } from '@/constants/Colors';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';


interface ColorPickerProps {
  style?: ViewStyle | ViewStyle[];
}

const COLORS = ['#EC4899', '#F472B6', '#F59E0B', '#4CAF50', '#3B82F6', '#6366F1'];

export default function ColorPicker({ style }: ColorPickerProps) {
  const { primaryColor, setPrimaryColor, mode } = useTheme();
  const [visible, setVisible] = useState(false);
  const backgroundColor = MODE_COLORS[mode].background;

  const handleColorPick = (color: string) => {
    setPrimaryColor(color);
    setVisible(false);
  }

  return (
    <View style={[styles.modalContent, { backgroundColor }]}>
      {COLORS.map((color) => (
        <TouchableOpacity
          key={color}
          style={[
            styles.colorDot,
            { backgroundColor: color },
            primaryColor === color && styles.activeDot,
          ]}
          onPress={() => handleColorPick(color)}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    elevation: 5,
  },
  colorDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  activeDot: {
    borderColor: 'black',
    borderWidth: 3,
  },
})
