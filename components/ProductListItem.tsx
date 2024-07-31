import { View, Text, Image } from 'react-native'
import React from 'react'
import { default_image } from '@/constants/Colors'
import RemoteImage from './RemoteImage';

const ProductListItem = ({ product }: any) => {
    console.log('productlist item', product);

    return (
        <View className=' flex-row p-2 bg-amber-400 rounded-md w-fullll w-1/2'>
            {/* <Image
                source={default_image}
                className='w-12 h-12 web:w-24 web:h-24 rounded-md'
                resizeMode='contain'
            /> */}
            <RemoteImage
                path={product.picture}
                fallback={default_image}
                className='w-12 h-12 web:w-24 web:h-24 rounded-md border'
                resizeMode="contain"
            />
            <Text className='self-center ml-4'>{product.name}</Text>
        </View>
    )
}

export default ProductListItem