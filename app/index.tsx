import { Link } from 'expo-router'
import { StyleSheet, TouchableOpacity } from 'react-native'

export default function Home() {
  return (
    <TouchableOpacity style={styles.button}>
      <Link href="/settings" style={styles.linkText}>Settings</Link>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  linkText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
