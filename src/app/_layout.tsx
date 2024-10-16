import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import AuthProvider from "@/src/providers/AuthProvider";
import "@/styles";
import { NativeWindStyleSheet } from "nativewind/dist/style-sheet";
import { SafeAreaView } from "react-native";
import QueryProvider from "../providers/QueryProvider";
import CartProvider from "../providers/CartProvider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: 'index',
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  console.log('hi from rootlayout...');

  const [loaded, error] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    console.log('hi, from useEffect of layaout', loaded);

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  NativeWindStyleSheet.setOutput({
    default: "native",
  });
  console.log('bye from root layout ', loaded);

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  console.log('ot tuka sme minali lvl 1');

  return (
    <AuthProvider>
      <QueryProvider>
        <CartProvider>
          <Slot />
        </CartProvider>
      </QueryProvider>
    </AuthProvider>
  );
}
