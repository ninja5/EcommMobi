import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useAuth } from '@/src/providers/AuthProvider'
import QueryProvider from '@/src/providers/QueryProvider';

export default function TabLayout() {
    const { isAdmin } = useAuth()
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
            <Tabs.Screen
                name='(product)'
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name='cart'
                options={{
                    title: "Cart",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="shopping-cart" color={color} />,
                }}
            />
            <Tabs.Screen
                name='(product-admin)'
                options={{
                    title: "Products",
                    //href: 'product',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="product-hunt" color={color} />,
                    ...(isAdmin ? {} : { href: null }), //hide component when not admin
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
            />
        </Tabs>
        // </QueryProvider>
    );
}
