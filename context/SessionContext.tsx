import { supabase } from '@/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';

interface SessionContextType {
  session: Session | null;
  user: User | null;
}

const SessionContext = createContext<SessionContextType>({
  session: null,
  user: null,
})

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    }
  }, []);

  return (
    <SessionContext.Provider value={{ session, user: session?.user ?? null }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => useContext(SessionContext);
