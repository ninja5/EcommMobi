import { View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView, Platform, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import AzButton from '@/components/AzButton'
import CCList from '@/components/CCardComponent/CCList'
import { CCard, GAddress } from '@/src/types'
import { useCart } from '@/src/providers/CartProvider'
import AddressListSection from '@/components/AddressComponent/AAList'
import { useAuth } from '@/src/providers/AuthProvider'

export default function CheckOutScreen() {
    const [creditCard, setCreditCard] = useState<CCard | null>(null);
    const [address, setAddress] = useState<GAddress | null>(null)
    const { total, checkout } = useCart();
    const { user } = useAuth();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            className='flex-1 bg-gray-100'
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView className='flex-1 px-4 py-2 border-red-500 rounded-md w-full self-center max-w-2xl'>
                    <View className='flex-1 bg-amber-300'>
                        <View className='border rounded-lg h-2/6 m-8 p-4' >
                            <Text className='self-start  -mt-9 bg-amber-300 ml-3 px-1  text-2xl'>Delivery adress</Text>
                            <AddressListSection updateSelection={setAddress} />
                        </View>
                        <View className='border rounded-lg m-8  h-2/6' >
                            <Text className='self-start  -mt-5 bg-amber-300 ml-3 px-1  text-2xl'>Payment method</Text>
                            <CCList updateSelection={setCreditCard} />
                        </View>
                        <Text className='text-2xl pl-4 font-bold mb-2'>Total: ${total.toFixed(2)}</Text>
                        <AzButton
                            className='self-center mt-auto mb-2'
                            text='Finalize the Order'
                            disabled={!creditCard || !address}
                            onPress={() => {
                                if (address && creditCard) {
                                    checkout(address, {
                                        ...creditCard,
                                        customer_id: creditCard.customer_id ? 'cus_' + creditCard.customer_id : user.payarc_object_id,
                                    });
                                }
                            }} />
                    </View>

                    <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}