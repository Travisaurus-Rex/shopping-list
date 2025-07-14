import React from 'react'
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { useTheme } from '../../context/ThemeContext'

type Variant = 'solid' | 'outline' | 'ghost'

type Props = {
  title: string
  onPress: (event: GestureResponderEvent) => void
  variant?: Variant
  disabled?: boolean
  fullWidth?: boolean
  color?: string // e.g. '#4CAF50' or 'black'
}

export default function Button({
  title,
  onPress,
  variant = 'solid',
  disabled = false,
  fullWidth = false,
  color,
}: Props) {

  const { primaryColor } = useTheme();
  const buttonColor = color ?? primaryColor;
  const buttonStyle: ViewStyle[] = [
  styles.baseButton,
  ...(fullWidth ? [styles.fullWidth] : []),
  ]

  const textStyle: TextStyle[] = [styles.baseText];

  switch (variant) {
    case 'solid':
      buttonStyle.push({ backgroundColor: buttonColor })
      textStyle.push({ color: 'white' })
      break
    case 'outline':
      buttonStyle.push({
        backgroundColor: 'transparent',
        borderColor: buttonColor,
        borderWidth: 2,
      })
      textStyle.push({ color: buttonColor })
      break
    case 'ghost':
      buttonStyle.push({ backgroundColor: 'transparent' })
      textStyle.push({ color: buttonColor })
      break
  }

  if (disabled) {
    buttonStyle.push(styles.disabled)
    textStyle.push(styles.disabledText)
  }

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    textDecorationLine: 'line-through',
  },
})
