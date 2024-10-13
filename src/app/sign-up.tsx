import { Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { Link, router, Stack } from 'expo-router'
import supabase from '@/lib/supabase'
import styles from '@/constants/Styles'
import AzButton from '@/components/AzButton'
const signUpScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function signUpWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password
        })
        setLoading(false)
        if (error) {
            Alert.alert(error.message)
            setError(error.message)
        } else
            router.back()

    }
    return (
        <KeyboardAvoidingView
            className="flex-1 items-center justify-center bg-amber-300 web:w-1/2 web:self-center"
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}>
            <Stack.Screen options={{ title: 'Sign up' }} />
            <Text className='p-3 text-3xl'>New user</Text>
            <View className='w-2/3 web:w-1/3 space-y-2 border border-teal-800 rounded-md p-3'>
                <Text className='text-xl'>Email</Text>
                <TextInput
                    className='text-xl pl-2 border rounded-md border-teal-800'
                    value={email}
                    onChangeText={setEmail}
                    placeholder='your@email.com'
                />
                <Text className='text-xl'>Password</Text>
                <TextInput
                    className='pl-2 text-xl border rounded-md  border-teal-800'
                    value={password}
                    onChangeText={setPassword}
                    placeholder=''
                    secureTextEntry
                />
                <Text className='text-2xl text-red-600'>{error} </Text>
            </View>
            {/* <Pressable className='mt-4 border border-teal-800 bg-amber-500 rounded-full w-2/3 web:w-1/3 p-3'
                onPress={signUpWithEmail} disabled={loading} >
                <Text className='self-center'>Sign Up</Text>
            </Pressable> */}
            <AzButton text='Sign Up' onPress={signUpWithEmail} disabled={loading} />
            <Link className='mt-8' href={'/sign-in'}>Sign In</Link>
        </KeyboardAvoidingView>
    )
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Sign up' }} />
            <Text style={styles.label}>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder='johan@doe.com'
                style={styles.input}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder=''
                style={styles.input}
                secureTextEntry
            />
            <Text style={styles.label}> </Text>
            <TouchableOpacity style={styles.opacity}
                onPress={signUpWithEmail} disabled={loading} >
                <Text style={styles.textButton}>Create account</Text>
            </TouchableOpacity>
            <Text style={styles.label}> </Text>
            <Link href={'/sign-in'} style={styles.textButton}>Sign in</Link>
        </View>
    )
}


export default signUpScreen

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//         //justifyContent: 'center',
//         // flex: 1,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#1E90FF',
//         padding: 10,
//         marginTop: 5,
//         marginBottom: 20,
//         backgroundColor: '#FFFACD',
//         borderRadius: 5,
//         fontSize: 20,
//     },
//     label: {
//         color: '#1E90FF',
//         fontSize: 25,
//     },
//     textButton: {
//         alignSelf: 'center',
//         fontWeight: 'bold',
//         color: '#1E90FF', // Colors.light.tint,
//         marginVertical: 10,
//         fontSize: 20,
//     },
//     opacity: {
//         alignSelf: 'center',
//         borderColor: '#1E90FF',
//         borderWidth: 1,
//         paddingHorizontal: 20,
//         borderRadius: 5,
//         backgroundColor: '#FFFACD',
//         width: '100%'
//     }
// })