import { View, Text, Platform, FlatList, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useCart } from '@/src/providers/CartProvider';
import CartListItem from '@/components/CartListItem';

import AzButton from '@/components/AzButton';
import AzAddress from '@/components/AzAddress';
import { useEffect, useState } from 'react';
import { PlaceAutocompletePrediction } from '@/src/types';
import { useAuth } from '@/src/providers/AuthProvider';
import { PayarcCustomerUpdate } from '@/lib/payarc';

const CartScreen = () => {
    const { items, total, checkout, totalQuantity } = useCart();
    const { user } = useAuth()
    const [deliveryAddress, setDeliveryAddress] = useState<PlaceAutocompletePrediction | null>(null)
    useEffect(() => {
        const updatePayarcAddress = async () => {
            if (user.payarc_object_id && deliveryAddress?.description) {
                await PayarcCustomerUpdate(user.payarc_object_id, { address_1: deliveryAddress.description.substring(0, 50) })
            }
            console.log('hi from efect of delivery address', user, deliveryAddress?.description);
        }
        updatePayarcAddress()
    }, [deliveryAddress])
    if (!totalQuantity) {
        return (
            <SafeAreaView className=' flex-1 p-2 bg-amber-300 rounded-md w-full web:self-center web:w-2/3 items-center justify-center'>
                <Text className='text-xl '>Please, first add items in the cart</Text>
            </SafeAreaView>
        )
    }

    return (
        <KeyboardAvoidingView
            className='bg-amber-300'
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
        >
            {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
            <SafeAreaView className=' flex-1 p-2 bg-amber-300 rounded-md w-full web:self-center web:w-2/3'>
                <FlatList
                    data={items}
                    renderItem={({ item }) => <CartListItem cartItem={item} />}
                    contentContainerStyle={{ gap: 10 }}
                />

                <Text style={{ marginTop: 20, fontSize: 20, fontWeight: '500' }}>
                    Total: ${total}
                </Text>
                {deliveryAddress?.description ? (<Text className='text-lg px-1 pt-2'>{deliveryAddress?.description}</Text>) : (<AzAddress updateAddress={setDeliveryAddress} />)}

                <AzButton className='self-center mb-4 disabled:1' onPress={checkout} text="Checkout" />

                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            </SafeAreaView>
            {/* </TouchableWithoutFeedback> */}
        </KeyboardAvoidingView>
    );
};

export default CartScreen;