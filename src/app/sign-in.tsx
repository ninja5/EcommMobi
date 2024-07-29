import { Alert, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Link, router, Stack } from 'expo-router'
import supabase from '@/lib/supabase'
import styles from '@/constants/Styles'
import AzButton from '@/components/AzButton'

const SignInScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function signInWithEmail() {
    setLoading(true)
    console.log('====================================');
    console.log('credentials', email, password);
    console.log('====================================');
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    }
    )
    console.log('====================================');
    console.log("Sign In error", error);
    console.log('====================================');
    setLoading(false)
    if (error) {
      Alert.alert(error.message)
      setError(error.message)
    } else {
      setError('')
      router.replace('/')
    }

  }


  return (
    <KeyboardAvoidingView
      className="flex-1 items-center justify-center bg-amber-300 web:w-1/2 web:self-center"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}>
      <Stack.Screen options={{ title: 'Sign in' }} />
      <Text className='p-3 text-3xl'>Welcome back</Text>
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
          /*style={styles.input}*/
          secureTextEntry
        />
        <Text className='text-2xl text-red-600'>{error} </Text>
      </View>
      {/* <Pressable className='mt-4 border border-teal-800 bg-amber-500 rounded-full w-2/3 web:w-1/3 p-3'
        onPress={signInWithEmail} disabled={loading} >
        <Text className='self-center'>Sign In</Text>
      </Pressable> */}
      <AzButton text='Sign In' onPress={signInWithEmail} disabled={loading} />
      <Link className='mt-8' href={'/sign-up'} >Sign Up</Link>
    </KeyboardAvoidingView>
  )
}

export default SignInScreen