import { useAuth } from "@/src/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, ImageBackground, View } from "react-native";

export default function AppLayout() {
    const { session, loading } = useAuth()
    if (loading) {
        return (<View style={{ flex: 1, alignItems: "center" }}>
            <ImageBackground source={require('@/assets/images/background3.png')} resizeMode='contain' style={{ height: '100%', width: '100%', aspectRatio: 1 }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <ActivityIndicator />
                </View>
            </ImageBackground>
        </View>
        )
    }
    if (!session) {
        return <Redirect href='/sign-in' />
    }
    return (<Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="(product)" options={{ presentation: 'modal' }} /> */}
    </Stack>)
}