import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useAuth } from '@/src/providers/AuthProvider'
import QueryProvider from '@/src/providers/QueryProvider';

export default function TabLayout() {
    const { isAdmin } = useAuth()
    return (
        <QueryProvider>
            <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
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
                {isAdmin && (
                    <Tabs.Screen
                        name='product'
                        options={{
                            title: "Products",
                            tabBarIcon: ({ color }) => <FontAwesome size={28} name="product-hunt" color={color} />,
                        }}
                    />)}
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                    }}
                />
            </Tabs>
        </QueryProvider>
    );
}
