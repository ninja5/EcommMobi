import { useAuth } from "@/src/providers/AuthProvider";
import { ActivityIndicator, ImageBackground, View } from "react-native";
import SignInScreen from "../sign-in";
import { Stack, useSegments } from "expo-router";
// export const unstable_settings = {
//     // Ensure that reloading on `/modal` keeps a back button present.
//     initialRouteName: '(tabs)',
// };

export default function AppLayout() {
    const { session, loading } = useAuth()
    const segments = useSegments();


    console.log('hi from (app) layout lvl2', session, loading);
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
        console.log('reve mi se.....', session, loading, segments)
        return <Stack /> //<Redirect href='/sign-in' />
    } else
        return (<Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* <Stack.Screen name="(product)" options={{ presentation: 'modal' }} /> */}
        </Stack>)
}