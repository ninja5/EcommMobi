import { Stack } from "expo-router";

export default function ProductLayout() {

    return (
        <Stack>
            <Stack.Screen name="create" options={{ title: 'Create new product', }} />
        </Stack>
    )
}

