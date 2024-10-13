import { View, Text, Platform, FlatList, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useCart } from '@/src/providers/CartProvider';
import CartListItem from '@/components/CartListItem';

import AzButton from '@/components/AzButton';
import { router } from 'expo-router';

const CartScreen = () => {
    const { items, total, totalQuantity } = useCart();

    if (!totalQuantity) {
        return (
            <SafeAreaView className='flex-1 p-4 bg-amber-300 rounded-md w-full web:self-center web:w-2/3 items-center justify-center'>
                <Text className='text-xl font-semibold'>Your cart is empty. Please add items to proceed.</Text>
            </SafeAreaView>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            className='flex-1 bg-gray-100'
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView className='flex-1 px-4 py-2 rounded-md w-full self-center max-w-2xl bg-amber-300'>
                    <View className='flex-1 bg-amber-300 mb-24'>
                        <FlatList
                            data={items}
                            renderItem={({ item }) => <CartListItem cartItem={item} />}
                            contentContainerStyle={{ gap: 10, paddingBottom: 100 }}
                        />
                    </View>
                    <View className='mx-4 p-4 flex-1 items-center justify-between absolute bottom-0 left-0 right-0 rounded-t-lg'>
                        <Text className='text-2xl self-start font-bold text-gray-700 mb-2'>Total: ${total.toFixed(2)}</Text>
                        <AzButton
                            onPress={() => {
                                router.push('/checkout');
                            }}
                            text="Go ahead..."
                        />
                    </View>
                    <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default CartScreen;