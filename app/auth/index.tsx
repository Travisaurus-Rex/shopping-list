import ThemedTextInput from '@/components/ui/ThemedTextInput'
import TopBar from '@/components/ui/TopBar'
import { MODE_COLORS } from '@/constants/Colors'
import { useTheme } from '@/context/ThemeContext'
import { supabase } from '@/supabase/client'
import { Stack } from 'expo-router'
import React, { useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
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

  const { mode, primaryColor } = useTheme();
  const isDarkMode = mode === 'dark';
  const color = MODE_COLORS[mode].text;
  const backgroundColor = MODE_COLORS[mode].background;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: isDarkMode ? 'black' : primaryColor}}>
      <TopBar title="Welcome" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // padding works better on iOS
        style={{ padding: 26, flex: 1, justifyContent: 'center', backgroundColor }}
      >
        <ScrollView
            contentContainerStyle={{ justifyContent: 'center', padding: 16 }}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={[styles.title, { color }]}>Login or Sign Up</Text>
            <ThemedTextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
            <ThemedTextInput
              placeholder="Password"
              secure
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
