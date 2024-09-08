import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";
import QueryProvider from "@/src/providers/QueryProvider";
import { useCart } from "@/src/providers/CartProvider";
import { View } from "@/components/Themed";

export default function TabLayout() {
    const { isAdmin } = useAuth();
    const { totalQuantity } = useCart();
    console.log('hi from (tabs) layout lvl3');

    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
            <Tabs.Screen
                name="(product)"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name="home" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: "Cart",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="shopping-cart" color={color} />,
                    tabBarBadge: totalQuantity ? totalQuantity : undefined,
                    // tabBarIcon: ({ color }) => {
                    //     return (
                    //         <View style={{ position: "relative" }}>
                    //             <FontAwesome size={28} name="shopping-cart" color={color} />
                    //             <View className="rounded-full  text-white bg-red-500 content-center items-center align-middle"
                    //                 style={{ position: "absolute", top: -5, right: -10, width: 15, height: 17 }}>
                    //                 {/* <Text>{totalQuantity}</Text> */}
                    //             </View>
                    //         </View>
                    //     );
                    // },
                }}
            />
            <Tabs.Screen
                name="(product-admin)"
                options={{
                    title: "Products",
                    //href: 'product',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name="product-hunt" color={color} />
                    ),
                    ...(isAdmin ? {} : { href: null }), //hide component when not admin
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name="cog" color={color} />
                    ),
                }}
            />
        </Tabs>
        // </QueryProvider>
    );
}
