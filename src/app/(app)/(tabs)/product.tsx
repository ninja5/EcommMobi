import { View, Text, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, TouchableWithoutFeedback, FlatList, ActivityIndicator, Keyboard } from 'react-native'
import React from 'react'
import { default_image } from '@/constants/Colors'
import ProductListItem from '@/components/ProductListItem'
import { useProductList } from '@/src/api/products'
import { useAuth } from '@/src/providers/AuthProvider'
import { useRouter } from 'expo-router'
import AzButton from '@/components/AzButton'

const ProductScreen = () => {
    const { isAdmin } = useAuth()
    const router = useRouter();
    if (!isAdmin) {
        router.replace('/')
    }
    const { data, isLoading, error } = useProductList();
    if (isLoading) {
        return <ActivityIndicator />;
    }
    if (error) {
        return <Text>Failed to fetch products from backend</Text>;
    }
    return (
        <KeyboardAvoidingView
            className='bg-amber-300'
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
        >
            <SafeAreaView className='web:w-2/3 self-center flex-1'>
                {/* <ScrollView> */}
                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
                {/* <> */}
                <FlatList
                    className=' border border-red-500 h-full'
                    data={data}
                    renderItem={({ item }) => <ProductListItem product={item} />}
                    ListHeaderComponent={() => (<Text className='self-center p-4'>Manage products</Text>)}
                    ListFooterComponent={() => (<AzButton className='self-center' onPress={() => { router.push('create') }} text='Create new product ...' />)}
                    numColumns={2}
                    contentContainerStyle={{ gap: 10, padding: 10 }}
                    columnWrapperStyle={{ gap: 10 }}
                    ListEmptyComponent={() => (<Text className='self-center p-28'>No items found yet...</Text>)}
                />
                {/* </> */}
                {/* </TouchableWithoutFeedback> */}
                {/* </ScrollView> */}
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default ProductScreen