import { Pressable, Text, View } from 'react-native';
import { forwardRef } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

type ButtonProps = {
    text: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const AzButton = forwardRef<View | null, ButtonProps>(
    ({ text, ...pressableProps }, ref) => {
        console.log('hi frim AzButton,', pressableProps);

        return (
            <Pressable ref={ref} {...pressableProps} className='mt-4 border border-teal-800 bg-amber-500 rounded-full w-2/3 web:w-1/3 p-3'>
                <View className='flex-row justify-center'>
                    {pressableProps?.disabled ? <MaterialIcons name='back-hand' size={22} className='text-2xl' /> : null}
                    <Text className='self-center' disabled={!!pressableProps?.disabled}>{text}</Text>
                </View>
            </Pressable>
        );
    }
);



export default AzButton;