import { supabase } from '@/src/supabase/client'
import { Stack } from 'expo-router'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import Button from '../../components/Button'

export const AuthScreen = ({ onAuthSuccess }: { onAuthSuccess: () => void }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) Alert.alert('Login error', error.message)
    else onAuthSuccess()
  }

  const handleSignUp = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) Alert.alert('Signup error', error.message)
    else Alert.alert('Success', 'Check your email to confirm.')
  }

  return (
    <View style={styles.container}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', padding: 20,
  },
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
  outlineButton: {
    backgroundColor: 'transparent',
    borderColor: '#007bff',
  }
})

export default function AuthLayout() {
  return (
    <>
      <Stack.Screen options={{ title: 'Login' }} />
      <AuthScreen onAuthSuccess={() => {}} />
    </>
  )
}
