import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Link, router, Stack } from 'expo-router'
import supabase from '@/lib/supabase'
import styles from '@/constants/Styles'

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
    // <View style={styles.container}>
    <View className="flex-1 items-center justify-center bg-white">
      <Stack.Screen options={{ title: 'Sign up' }} />
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder='your@email.com'
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
      <Text style={[styles.label, { color: 'red', fontSize: 18 }]}>{error} </Text>
      <TouchableOpacity style={styles.opacity}
        onPress={signInWithEmail} disabled={loading} >
        <Text style={styles.textButton}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.label}> </Text>
      <Link href={'/sign-up'} style={styles.textButton}>Sign Up</Link>
    </View>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     // justifyContent: 'center',
//     // flex: 1,
//     // width: '100%'
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#1E90FF',
//     padding: 10,
//     marginTop: 5,
//     marginBottom: 20,
//     backgroundColor: '#FFFACD',
//     borderRadius: 5,
//     fontSize: 20,
//   },
//   label: {
//     color: '#1E90FF',
//     fontSize: 25,
//   },
//   textButton: {
//     alignSelf: 'center',
//     fontWeight: 'bold',
//     color: '#1E90FF', // Colors.light.tint,
//     marginVertical: 15,
//     fontSize: 20,
//   },
//   opacity: {
//     alignSelf: 'center',
//     borderColor: '#1E90FF',
//     borderWidth: 1,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     backgroundColor: '#FFFACD',
//     width: '100%'
//   }
// })

export default SignInScreen