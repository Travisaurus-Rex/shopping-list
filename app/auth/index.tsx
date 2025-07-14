import TopBar from '@/components/ui/TopBar'
import { MODE_COLORS } from '@/constants/Colors'
import { useTheme } from '@/context/ThemeContext'
import { supabase } from '@/supabase/client'
import { Stack } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Button from '../../components/ui/Button'

export const AuthScreen = ({ onAuthSuccess }: { onAuthSuccess: () => void }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) Alert.alert('Login error', error.message);
    else onAuthSuccess();
  }

  const handleSignUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) Alert.alert('Signup error', error.message);
    else Alert.alert('Success', 'Check your email to confirm.');
  }

  const { mode } = useTheme();
  const backgroundColor = MODE_COLORS[mode].background;

  return (
    <View style={{flex: 1, backgroundColor}}>
      <TopBar title="Welcome" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // padding works better on iOS
        style={{ padding: 26, transform: 'translateY(-40px)', flex: 1, justifyContent: 'center' }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 16 }}>
            <Text style={styles.title}>Login or Sign Up</Text>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
            <View style={styles.buttonRow}>
              <View style={styles.buttonWrapper}>
                <Button
                  title="Sign In"
                  onPress={handleSignIn}
                  variant="solid"
                  fullWidth
                  disabled={loading}
                />
              </View>
              <View style={{ width: 10 }} />
              <View style={styles.buttonWrapper}>
                <Button
                  title="Sign Up"
                  onPress={handleSignUp}
                  variant="outline"
                  fullWidth
                  disabled={loading}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 4, marginBottom: 12, padding: 10,
  },
  title: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    gap: 5
  },
  buttonWrapper: {
    flex: 1,
  },
  colorPicker: {
    position: 'absolute',
    top: 24,
    right: 24,
    zIndex: 10,
  },
})

export default function AuthLayout() {
  return (
    <>
      <Stack.Screen options={{ title: 'Login' }} />
      <AuthScreen onAuthSuccess={() => {}} />
    </>
  )
}
