import { View, Text, Platform, SafeAreaView, ScrollView, Image, Pressable, KeyboardAvoidingView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import AzButton from '@/components/AzButton';
import { default_image } from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AzTextInput from '@/components/AzTextInput';
import supabase from '@/lib/supabase';
import { decode } from 'base64-arraybuffer';
import { randomUUID } from 'expo-crypto';
import { useInsertProduct } from '@/src/api/products';

const CreateProductScreen = () => {
    const [image, setImage] = useState<string | undefined>(undefined);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState('');
    const router = useRouter();
    const { mutate: insertProduct } = useInsertProduct();


    const resetFields = () => {
        setName('')
        setDescription('')
        setPrice('')
    }

    const validateInput = () => {
        setErrors('');
        if (!name) {
            setErrors('Name is required');
            return false;
        }
        if (!description) {
            setErrors('Description is required');
            return false;
        }
        if (!price) {
            setErrors('Price is required');
            return false;
        }
        if (isNaN(parseFloat(price))) {
            setErrors('Price is not a number');
            return false;
        }
        return true;
    }

    const onCreate = async () => {
        if (!validateInput()) {
            return;
        }
        const imagePath = await uploadImage();
        //Save in the database
        insertProduct(
            { name, description, price: parseFloat(price), image: imagePath },
            {
                onSuccess: () => {
                    resetFields();
                    router.back();
                },
            }
        )
    }

    const uploadImage = async () => {
        let base64 = null
        if (image?.startsWith('file://')) {
            console.log('start covert berore Upload process....')
            base64 = await FileSystem.readAsStringAsync(image, {
                encoding: 'base64',
            });
        } else if (image?.startsWith('data')) {
            base64 = image.split(',')[1] || ''
        } else {
            return
        }
        const filePath = `${randomUUID()}.png`;
        const contentType = 'image/png';

        const { data, error } = await supabase.storage
            .from('product-images')
            .upload(filePath, decode(base64), { contentType });
        if (error)
            setErrors(`Upload image: ${error}, ${error?.message}`)
        console.log('Error upload', error);
        console.log('data upload', data);
        if (data) {
            return data.fullPath;
        }
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        } else
            setImage(undefined)
    }

    return (
        <KeyboardAvoidingView
            className='bg-amber-300'
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
        >
            {/* <SafeAreaView className='w-full web:w-2/3 self-center items-center justify-center p-6 flex-1 bg-amber-300 border border-blue-700'> */}
            {/* <Stack.Screen options={{ title: 'Create new product' }} /> */}
            <ScrollView className='w-fulll h-fulll flex-1'
                contentContainerStyle={{ 'alignItems': 'center' }}>
                <Pressable onPress={pickImage} className='m-6'>
                    <Image
                        source={{ uri: image }}
                        defaultSource={default_image}
                        className='w-36 max-h-36 aspect-square self-center border border-green-800 rounded-xl'
                    />
                </Pressable>
                <View className='flex-1 web:w-2/3 p-5 border border-red-600 items-center'>
                    <AzTextInput
                        title={'Name'}
                        value={name}
                        handleChangeText={setName}
                        placeholder={'enter product name...'}
                        otherStyles={undefined}
                        keyboardType={undefined}
                        disabled={false} handleBlur={undefined} />
                    <AzTextInput
                        title={'Description'}
                        value={description}
                        handleChangeText={setDescription}
                        placeholder={'enter product description...'}
                        otherStyles={undefined}
                        keyboardType={undefined}
                        disabled={false} handleBlur={undefined} />
                    <AzTextInput
                        title={'Base price'}
                        value={price}
                        handleChangeText={setPrice}
                        placeholder={'enter product base price...'}
                        otherStyles={undefined}
                        keyboardType={'decimal-pad'}
                        disabled={false} handleBlur={undefined} />
                </View>
                <Text className='text-red-800 mt-4'>{errors}</Text>
                {/* <View className=' border flex-row web:w-1/3 p-3 items-center justify-between'>
                     <AzButton text='Cancel' onPress={() => router.replace('product-admin')} />
                    <Text>  </Text> */}
                <AzButton text='Persist' onPress={onCreate} />
                {/* </View> */}
            </ScrollView>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            {/* </SafeAreaView> */}
        </KeyboardAvoidingView>
    )
}

export default CreateProductScreen