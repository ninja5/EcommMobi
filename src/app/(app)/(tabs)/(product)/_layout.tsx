import { Stack } from "expo-router";
import React from "react";
// export const unstable_settings = {
//     // Ensure that reloading on `/modal` keeps a back button present.
//     initialRouteName: 'product',
// };
export default function ProductLayout() {

    return (
        <Stack>
            <Stack.Screen name="(product)" options={{ title: 'test PROD', }} />
            <Stack.Screen name="index" options={{ title: 'use PROD', }} />
            <Stack.Screen name="[id]" options={{ title: 'Details', }} />
            {/* <Stack.Screen name="product" options={{ title: 'MMMANAGE PROD', }} />
            <Stack.Screen name="index2" options={{ title: 'use PROD', }} />
            <Stack.Screen name="create" options={{ title: 'Create new product', }} />
            <Stack.Screen name="[id]" options={{ title: 'Details', presentation: 'modal' }} /> */}
        </Stack>
    )
}

