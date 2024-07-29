import { Pressable, Text, View } from 'react-native';
import { forwardRef } from 'react';

type ButtonProps = {
    text: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const AzButton = forwardRef<View | null, ButtonProps>(
    ({ text, ...pressableProps }, ref) => {
        return (
            <Pressable ref={ref} {...pressableProps} className='mt-4 border border-teal-800 bg-amber-500 rounded-full w-2/3 web:w-1/3 p-3'>
                <Text className='self-center'>{text}</Text>
            </Pressable>
        );
    }
);



export default AzButton;