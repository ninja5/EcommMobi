import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { default_image } from '@/constants/Colors'
import RemoteImage from './RemoteImage';
import { Link, useSegments } from 'expo-router';

const ProductListItem = ({ product }: any) => {
    console.log('productlist item', product);
    const segments = useSegments();
    console.log('====================================');
    console.log('segments are ', segments, segments.slice(-1)[0]);
    console.log('====================================');
    return (
        <Link href={`/${segments.slice(-1)[0]}/${product.id}`} asChild>
            <Pressable className=' flex-row p-2 bg-amber-400 rounded-md w-fullll w-1/2'>
                {/* <Image
                source={default_image}
                className='w-12 h-12 web:w-24 web:h-24 rounded-md'
                resizeMode='contain'
            /> */}
                <RemoteImage
                    path={product.picture}
                    fallback={default_image}
                    className='w-12 h-12 web:w-24 web:h-24 rounded-md'
                    resizeMode="contain"
                />
                <View className='self-center flex-1 ml-4'>
                    <Text className='text-xl'>{product.name}</Text>
                    <Text className='self-start px-3  mt-2 rounded-md bg-amber-500 text-lg'>$ {product.price}</Text>
                </View>
            </Pressable>
        </Link>
    )
}

export default ProductListItem