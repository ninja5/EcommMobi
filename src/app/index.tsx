import { View, Text } from 'react-native'
import React from 'react'
import SignInScreen from './sign-in'
import { useAuth } from '../providers/AuthProvider'
import { Redirect, Stack } from 'expo-router'

export default function index() {
    const { session } = useAuth()
    if (session) {
        return (<Redirect href={'/(tabs)'} />)
    }
    return (
        <SignInScreen />
    )
}