import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
interface UserAuth {
    avatar_url?: string,
    full_name: string,
    id: string,
    profile: "USER" | "Afmin",
    username: string,
    website?: string,
    email: string
}
type AuthData = {
    session: Session | null,
    loading: boolean,
    isAdmin: boolean,
    user: UserAuth,
    modUser: (params: UserAuth) => Promise<void>,
}

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    isAdmin: false,
    user: {
        full_name: '',
        id: '',
        profile: 'USER',
        username: '',
        email: '',
    },
    modUser: async function (params: UserAuth) {
    }
})

export default function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState<UserAuth>({
        full_name: '',
        id: '',
        profile: 'USER',
        username: '',
        email: '',

    })
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)
    const modUser = async function (params: UserAuth) {
        const { full_name, username, id } = params
        setLoading(true)
        const { error, data: newProduct } = await supabase
            .from('profiles')
            .update({
                full_name: full_name,
                username: username,
            })
            .eq('id', id)
            .select()
            .single()
        if (error) {
            setLoading(false)
            throw new Error(error.message)
        } else {
            setUser(params)
        }
        setLoading(false)
        console.log('====================================');
        console.log('Asybc AuthProvider modUser ', error, newProduct);
        console.log('====================================');

    }
    console.log('====================================');
    console.log('function AuthProvider');
    console.log('====================================');

    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await supabase.auth.getSession()
            setSession(data.session)
            console.log('Session:', data, ' user:', user);
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
                        .select('*')
                        .eq('id', session.user.id)
                        .single()
                    console.log('ProfileSelect result is ', group, ' for user  ', session.user.id);
                    setIsAdmin(group?.profile === "ADMIN")
                    setUser({ ...user, ...group, email: session.user.email })

                }
                setLoading(false)
            }
            fetchIsAdmin()
            setSession(session)
        })
    }, [])


    return <AuthContext.Provider value={{
        session, loading, isAdmin, user, modUser
    }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)