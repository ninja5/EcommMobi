import { View, Text, Platform, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useCart } from '@/src/providers/CartProvider';
import CartListItem from '@/components/CartListItem';

import AzButton from '@/components/AzButton';

const CartScreen = () => {
    const { items, total, checkout } = useCart();

    return (
        <View style={{ padding: 10 }}>
            <FlatList
                data={items}
                renderItem={({ item }) => <CartListItem cartItem={item} />}
                contentContainerStyle={{ gap: 10 }}
            />

            <Text style={{ marginTop: 20, fontSize: 20, fontWeight: '500' }}>
                Total: ${total}
            </Text>
            <AzButton onPress={checkout} text="Checkout" />

            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
};

export default CartScreen;