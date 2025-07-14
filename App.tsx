import { useEffect, useState } from 'react'
import { supabase } from './src/supabase/client'
import { Session } from '@supabase/supabase-js'
import AuthScreen from './src/screens/AuthScreen'
import ListScreen from './src/screens/ListScreen'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  if (!session) {
    return <AuthScreen onAuthSuccess={() => {}} />
  }

  return <ListScreen />
}
