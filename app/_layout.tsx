import { SessionProvider } from '@/context/SessionContext';
import { Session } from '@supabase/supabase-js';
import { Slot, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '../context/ThemeContext';
import { supabase } from '../supabase/client';

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (!session) {
        router.replace('/auth');
      } else {
        router.replace('/');
      }
    })

    return () => {
      listener.subscription.unsubscribe();
    }
  }, [])

  return (
    <SessionProvider>
      <ThemeProvider>
        <GestureHandlerRootView>
          <Slot />
          <StatusBar style="auto" translucent={false} backgroundColor="transparent" />
        </GestureHandlerRootView>
      </ThemeProvider>
    </SessionProvider>
  );
}

