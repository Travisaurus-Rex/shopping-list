import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';


interface ColorPickerProps {
  style?: ViewStyle | ViewStyle[];
}

const COLORS = ['#EC4899', '#F472B6', '#F59E0B', '#4CAF50', '#3B82F6', '#6366F1'];

export default function ColorPicker({ style }: ColorPickerProps) {
  const { primaryColor, setPrimaryColor } = useTheme();
  const [visible, setVisible] = useState(false);

  const handleColorPick = (color: string) => {
    setPrimaryColor(color);
    setVisible(false);
  }

  return (
    <View style={style}>
      {/* Icon button to open the modal */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.icon}>🎨</Text>
      </TouchableOpacity>

      {/* Color picker modal */}
      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setVisible(false)}
        >
          <View style={styles.modalContent}>
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
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  iconButton: {
    padding: 8,
    alignSelf: 'flex-end',
  },
  icon: {
    fontSize: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flexDirection: 'row',
    backgroundColor: 'white',
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
