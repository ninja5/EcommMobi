import { PayarcCustomerAdd, PayarcCustomerUpdate } from '@/lib/payarc';
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
    email: string,
    payarc_object_id: string | null,
}//todo move to types
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
        payarc_object_id: null,
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
        payarc_object_id: null,

    })
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)
    const modUser = async function (params: UserAuth) {
        console.log('hi from moduser...');

        const { full_name, username, id, email, payarc_object_id } = params
        setLoading(true)
        const customer = { name: full_name, email: email }
        console.log('U are about to update user', user, ' with ', customer);
        let newData: any = {}
        if (payarc_object_id) {
            newData = await PayarcCustomerUpdate(payarc_object_id, customer)
        } else {
            newData = await PayarcCustomerAdd(customer)
        }
        console.log('Payarc replay', newData);

        const { error, data: newProduct } = await supabase
            .from('profiles')
            .update({
                full_name: full_name,
                username: username,
                ...((newData?.object_id) && { payarc_object_id: newData?.object_id })
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
    console.log('function AuthProvider session', session);
    console.log('====================================');

    useEffect(() => {
        const fetchSession = async () => {
            console.log('fetchSession, comment to be removed isLoged');
            const { data } = await supabase.auth.getSession()
            setSession(data.session)
            console.log('use effect setSession Session:', data, ' user:', user);
            setLoading(false)
        }
        console.log('hi, from useEffect of authprovider');

        fetchSession()
        supabase.auth.onAuthStateChange((_event, session) => {
            console.log('supabase.auth.onAuthStateChange');
            const fetchIsAdmin = async () => {
                console.log('hi from  fetchisadmin session is', session);
                setLoading(true)
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
                console.log('bye from fetchIsAdmin...');

            }
            fetchIsAdmin()
            setSession(session)
            console.log('bye from onAuthStateChange....', session);

        })
    }, [])

    console.log('bye from AuthProvider...');

    return <AuthContext.Provider value={{
        session, loading, isAdmin, user, modUser
    }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)