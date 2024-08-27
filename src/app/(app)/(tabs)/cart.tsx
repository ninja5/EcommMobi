import { View, Text, Platform, FlatList, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useCart } from '@/src/providers/CartProvider';
import CartListItem from '@/components/CartListItem';

import AzButton from '@/components/AzButton';
import AzAddress from '@/components/AzAddress';

const CartScreen = () => {
    const { items, total, checkout } = useCart();

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
                <AzAddress />
                <AzButton className='self-center mb-4 disabled:1' onPress={checkout} text="Checkout" />

                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            </SafeAreaView>
            {/* </TouchableWithoutFeedback> */}
        </KeyboardAvoidingView>
    );
};

export default CartScreen;