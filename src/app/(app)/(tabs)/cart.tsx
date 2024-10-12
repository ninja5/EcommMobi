import { View, Text, Platform, FlatList, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useCart } from '@/src/providers/CartProvider';
import CartListItem from '@/components/CartListItem';

import AzButton from '@/components/AzButton';
import AzAddress from '@/components/AzAddress';
import { useEffect, useState } from 'react';
import { CCard, PlaceAutocompletePrediction } from '@/src/types';
import { useAuth } from '@/src/providers/AuthProvider';
import { PayarcCustomerUpdate } from '@/lib/payarc';
import CCList from '@/components/CCardComponent/CCList';

const CartScreen = () => {
    const { items, total, checkout, totalQuantity } = useCart();
    const { user } = useAuth()
    const [deliveryAddress, setDeliveryAddress] = useState<PlaceAutocompletePrediction | null>(null)
    const [creditCard, setCreditCard] = useState<CCard | null>(null)
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
            <SafeAreaView className=' flex-1 p-2 bg-amber-300  rounded-md w-full web:self-center web:w-2/3'>
                <View>
                    <FlatList className='border-slate-800 w-full'
                        data={items}
                        renderItem={({ item }) => <CartListItem cartItem={item} />}
                        contentContainerStyle={{ gap: 5 }}
                    />
                </View>
                <View className='mx-4 bg-purple-500 absolute bottom-0 left-0 right-0'>
                    <Text style={{ marginTop: 20, fontSize: 20, fontWeight: '500' }}>
                        Total: ${total}
                    </Text>
                    {deliveryAddress?.description ? (<Text className='text-lg px-1 pt-2'>Delivery to: {deliveryAddress?.description}</Text>) : (<AzAddress updateAddress={setDeliveryAddress} />)}

                    {(deliveryAddress?.description && !creditCard) ? (<CCList updateSelection={setCreditCard} />) : ((deliveryAddress?.description && creditCard) ? (<Text className='text-lg px-1 pt-2'>Pay with: {creditCard?.first6digit} ... {creditCard?.last4digit}</Text>) : null)}

                    <AzButton className='self-center mb-4 disabled:1'
                        onPress={
                            () => {
                                if (!!deliveryAddress && !!creditCard) {
                                    checkout(deliveryAddress,
                                        { ...creditCard, customer_id: creditCard.customer_id ? 'cus_' + creditCard.customer_id : user.payarc_object_id })
                                }
                            }
                        } disabled={(!!!deliveryAddress?.description || !!!creditCard)} text="Checkout" />
                </View>
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            </SafeAreaView>
            {/* </TouchableWithoutFeedback> */}
        </KeyboardAvoidingView>
    );
};

export default CartScreen;