import { View, Text, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, Keyboard, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AzButton from '@/components/AzButton'
import supabase from '@/lib/supabase'
import AzTextInput from '@/components/AzTextInput'
import { useAuth } from '@/src/providers/AuthProvider'
import { Redirect } from 'expo-router'

const profileScreen = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | undefined>()
    const { session, user, modUser } = useAuth()
    const [currentUser, setCurrentUser] = useState(user)
    useEffect(() => {
        const getUser = async () => {
            setLoading(true)
            console.log('====================================');
            console.log('Ura zarevdame ekrana ', user, currentUser);
            console.log('====================================');
            setCurrentUser({
                ...user
            })
            setLoading(false)
        }
        getUser()
        return () => {
            console.log('====================================');
            console.log('destry object from profileScreen ');
            console.log('session is', session);
            console.log('====================================');
        }
    }, [])


    // async function signOut() {
    const signOut = async () => {
        setLoading(true)
        const { error } = await supabase.auth.signOut()
        setError(error?.message)
        if (!error) {
            setCurrentUser(user)
        }
        setLoading(false)
        console.log('begin to sign out...', session);
    }

    const updateUser = async () => {
        modUser(currentUser)
    }

    if (loading) {
        return (<ActivityIndicator />)
    }
    return (
        <KeyboardAvoidingView
            className='bg-amber-300'
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
        >
            <SafeAreaView className='web:w-2/3 self-center flex-1'>
                <ScrollView>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <>
                            <View className='border rounded-lg m-8' >
                                <Text className='self-start  -mt-5 bg-amber-300 ml-3 px-1  text-2xl'>User details</Text>
                                <View className='m-5 web:w-1/2'>
                                    <AzTextInput
                                        title="Full Name"
                                        value={currentUser.full_name}
                                        handleChangeText={(e: any) => setCurrentUser({ ...currentUser, full_name: e })}
                                        otherStyles="mt-7"
                                        keyboardType='default' placeholder={undefined} disabled={false} handleBlur={undefined} />
                                    <AzTextInput
                                        title="Account name"
                                        value={currentUser.username}
                                        handleChangeText={(e: any) => setCurrentUser({ ...currentUser, username: e })}
                                        otherStyles="mt-7"
                                        keyboardType='default' placeholder={undefined} disabled={false} handleBlur={undefined} />
                                    {/* <AzTextInput
                                        title="Email"
                                        value={currentUser.email}
                                        handleChangeText={(e: any) => setCurrentUser({ ...currentUser, email: e })}
                                        otherStyles="mt-7"
                                        keyboardType='email-address'
                                        disabled={true} placeholder={undefined} /> */}
                                    {/* <AzTextInput
                                        title='Password'
                                        value={undefined}
                                        handleChangeText={undefined}
                                        placeholder='Type pass'
                                        otherStyles={undefined}
                                        keyboardType={undefined}
                                        disabled={false} /> */}
                                    {/* <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur mattis velit at lobortis. Nullam commodo mi et ultricies placerat. Donec ac accumsan mi. Cras ac porttitor arcu. Maecenas molestie euismod nulla, eget vestibulum enim pharetra ac</Text> */}
                                </View>
                                <View className='web:flex-row bgzzzzz-slate-500 justify-between'>
                                    <AzButton className='self-start m-5' text='Save' onPress={updateUser} />
                                    <AzButton className='self-end m-5' text='Log Out' onPress={signOut} />
                                </View>
                            </View>
                            <View className='border rounded-lg m-8' >
                                <Text className='self-start  -mt-5 bg-amber-300 ml-3 px-1  text-2xl'>Order history</Text>
                                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur mattis velit at lobortis. Nullam commodo mi et ultricies placerat. Donec ac accumsan mi. Cras ac porttitor arcu. Maecenas molestie euismod nulla, eget vestibulum enim pharetra ac</Text>
                            </View>
                        </>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default profileScreen