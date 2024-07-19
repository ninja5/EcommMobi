import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack } from 'expo-router'
import supabase from '@/lib/supabase'
import styles from '@/constants/Styles'
const signUpScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function signUpWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password
        }
        )
        if (error) Alert.alert(error.message)
        setLoading(false)
    }
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