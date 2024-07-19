import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
type AuthData = {
    session: Session | null,
    loading: boolean,
    isAdmin: boolean,
}

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    isAdmin: false,
})

export default function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)

    console.log('====================================');
    console.log('function AuthProvider');
    console.log('====================================');

    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await supabase.auth.getSession()
            setSession(data.session)
            console.log('Session:', data);
            setLoading(false)
        }
        fetchSession()
        supabase.auth.onAuthStateChange((_event, session) => {
            console.log('onAuthStateChange');
            const fetchIsAdmin = async () => {
                setLoading(true)
                //console.log('fetchIsAdmin',session);
                if (session) {
                    const { data: group } = await supabase
                        .from('profiles')
                        .select('group')
                        .eq('id', session.user.id)
                        .single()
                    //console.log('Select result is ', group);
                    setIsAdmin(group?.group === "ADMIN")

                }
                setLoading(false)
            }
            fetchIsAdmin()
            setSession(session)
        })
    }, [])
    return <AuthContext.Provider value={{ session, loading, isAdmin }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)