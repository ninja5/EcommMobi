import { View, Text, TextInput, KeyboardTypeOptions, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { forwardRef } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type CompProps = {
    title: string,
    value: string | undefined,
    handleChangeText: any,
    placeholder: string | undefined,
    otherStyles: string | undefined,
    keyboardType: KeyboardTypeOptions | undefined,
    disabled: boolean,
    handleBlur: any,
} & React.ComponentPropsWithoutRef<typeof TextInput>;

// const AzTextInput1 = ({ title, value, handleChangeText, placeholder, otherStyles, ...props }) => {
//     return (
//         <View className='space-y-2'>
//             <Text className={`text-base text-gray-600 font-medium ${otherStyles}`}>{title}</Text>
//             <View className='border w-full h-14 px-4 bg-black rounded-2xl border-amber-700 focus:border-amber-900 items-center'>
//                 <TextInput
//                     className='flex-1 text-white font-semibold text-base'
//                     value={value}
//                     placeholder={placeholder}
//                     placeholderTextColor="#7b7b8b"
//                     onChangeText={handleChangeText}
//                 />
//             </View>
//         </View>
//     )
// }
const AzTextInput = forwardRef<View | null, CompProps>(
    ({ title, value, handleChangeText, placeholder, otherStyles, keyboardType, handleBlur, ...pinputProps }, ref) => {
        const [showPassword, setshowPassword] = useState(false)
        return (
            <View className='mt-4 space-y-2'>
                <Text className={`ml-3 text-base text-gray-600 font-medium ${otherStyles}`}>{title}</Text>
                <View className='border w-full flex-row h-14 bg-black rounded-2xl border-amber-700 focus:border-amber-900 items-center'>
                    <TextInput
                        className='flex-1 text-white h-14 rounded-2xl px-4 font-semibold text-base'
                        value={value || ""}
                        placeholder={placeholder}
                        placeholderTextColor="#7b7b8b"
                        onChangeText={handleChangeText}
                        keyboardType={keyboardType}
                        secureTextEntry={title === "Password" && !showPassword}
                        onBlur={handleBlur}
                    />
                    {title === 'Password' && (<Pressable onPress={() => setshowPassword(!showPassword)}>
                        <FontAwesome size={28} name={showPassword ? "eye-slash" : "eye"} color="white" />
                    </Pressable>)}
                </View>
            </View>
        );
    }
);

export default AzTextInput