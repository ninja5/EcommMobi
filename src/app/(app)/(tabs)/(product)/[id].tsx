import { View, Text, ActivityIndicator, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useProduct } from '@/src/api/products';
import RemoteImage from '@/components/RemoteImage';
import { default_image } from '@/constants/Colors';
import AzButton from '@/components/AzButton';
import { useCart } from '@/src/providers/CartProvider';

const ProductDetailsScreen = () => {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : '-1');
    const { data: product, error, isLoading } = useProduct(id);
    const { addItem } = useCart();
    const router = useRouter()

    const addToCart = () => {
        console.log('OPA.....');

        if (!product) {
            return;
        }
        addItem(product/*, selectedSize*/);
        router.push('/');
    };

    if (isLoading) {
        return <ActivityIndicator />
    }
    if (error) {
        return <Text>Failed to fetch products</Text>;
    }
    return (
        <KeyboardAvoidingView
            className='bg-amber-300'
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
        >
            <SafeAreaView className=' flex-1 p-2 bg-amber-400 rounded-md w-full web:self-center web:w-2/3'>
                <Stack.Screen options={{ title: product.name }} />
                <RemoteImage
                    path={product?.picture}
                    fallback={default_image}
                    className='w-4/5 aspect-square mt-6 web:w-1/3 rounded-md self-center'
                    resizeMode="contain"
                />
                <View className='ml-4 mb-2 justify-end flex-1'>
                    <Text className='text-xl'>Price</Text>
                    <Text className='self-start px-3  mt-2 rounded-md bg-amber-500 text-lg'>$ {product.price}</Text>
                    <AzButton className='self-center' onPress={addToCart} text='Add to cart ...' />
                </View>

            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default ProductDetailsScreen