import { Slot, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { supabase } from '../src/supabase/client'
import { Session } from '@supabase/supabase-js'

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)

      if (!session) {
        router.replace('/auth')
      } else {
        router.replace('/')
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return <Slot /> // This renders the current screen (e.g. auth/index or index.tsx)
}

