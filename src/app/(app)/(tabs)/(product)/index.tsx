import { View, Text, FlatList, TouchableWithoutFeedback, Keyboard, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React from 'react'
import ProductListItem from '@/components/ProductListItem'
import { useProductList } from '@/src/api/products';

const HomeScreen = () => {
    const { data, isLoading, error } = useProductList();
    if (isLoading) {
        return <ActivityIndicator />;
    }
    if (error) {
        return <Text>Failed to fetch products from backend</Text>;
    }
    console.log('====================================');
    console.log('hi, from index', data);
    console.log('====================================');
    return (
        <KeyboardAvoidingView
            className='bg-amber-300'
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
        >
            <SafeAreaView className='web:w-2/3 self-center flex-1'>
                {/* <ScrollView> */}
                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
                <FlatList
                    className=' border border-red-500 h-full'
                    data={data}
                    renderItem={({ item }) => <ProductListItem product={item} />}
                    numColumns={2}
                    contentContainerStyle={{ gap: 10, padding: 10 }}
                    columnWrapperStyle={{ gap: 10 }}
                    ListEmptyComponent={() => (<Text className='self-center p-28'>No items found yet...</Text>)}
                />
                {/* </TouchableWithoutFeedback> */}
                {/* </ScrollView> */}
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
    // return (
    //     <View>
    //         <Text>HomeScreen</Text>
    //     </View>
    // )
}

export default HomeScreen