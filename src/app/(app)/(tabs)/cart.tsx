import { View, Text, Platform, FlatList, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useCart } from '@/src/providers/CartProvider';
import CartListItem from '@/components/CartListItem';

import AzButton from '@/components/AzButton';

const CartScreen = () => {
    const { items, total, checkout } = useCart();

    return (
        <SafeAreaView className=' flex-1 p-2 bg-amber-300 rounded-md w-full web:self-center web:w-2/3'>
            <FlatList
                data={items}
                renderItem={({ item }) => <CartListItem cartItem={item} />}
                contentContainerStyle={{ gap: 10 }}
            />

            <Text style={{ marginTop: 20, fontSize: 20, fontWeight: '500' }}>
                Total: ${total}
            </Text>
            <AzButton className='self-center mb-4 disabled:1' onPress={checkout} text="Checkout" />

            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </SafeAreaView>
    );
};

export default CartScreen;