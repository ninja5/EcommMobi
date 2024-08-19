
import { CartItem, Tables } from '@/src/types';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { randomUUID } from 'expo-crypto';
import { useInsertOrder } from '@/src/api/orders';
import { useRouter } from 'expo-router';
import { useInsertOrderItems } from '@/src/api/orders';
//import { initialisePaymentSheet, openPaymentSheet } from '@/lib/stripe';

type Product = Tables<'products'>;

type CartType = {
    items: CartItem[];
    addItem: (product: Product /*, size: CartItem['size']*/) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
    total: number;
    totalQuantity: number;
    checkout: () => void;
};

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => { },
    updateQuantity: () => { },
    total: 0,
    totalQuantity: 0,
    checkout: () => { },
});

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const { mutate: insertOrder } = useInsertOrder();
    const { mutate: insertOrderItems } = useInsertOrderItems();

    const router = useRouter();

    const addItem = (product: Product /*, size: CartItem['size']*/) => {
        // if already in cart, increment quantity
        const existingItem = items.find(
            (item) => item.product === product /*&& item.size === size */
        );

        if (existingItem) {
            updateQuantity(existingItem.id, 1);
            return;
        }

        const newCartItem: CartItem = {
            id: randomUUID(), // generate
            product,
            product_id: product.id,
            /* size,*/
            quantity: 1,
        };

        setItems([newCartItem, ...items]);
    };

    // updateQuantity
    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        setItems(
            items
                .map((item) =>
                    item.id !== itemId
                        ? item
                        : { ...item, quantity: item.quantity + amount }
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const total = items.reduce(
        (sum, item) => (sum += item.product.price * item.quantity),
        0
    );
    const totalQuantity = items.reduce((quantity, item) => (quantity += item.quantity), 0)

    const clearCart = () => {
        setItems([]);
    };

    const checkout = async () => {
        //todo
        //1. get delivery address
        //2. get payment method
        //3. call payarc
        //4. create the order
        // await initialisePaymentSheet(Math.floor(total * 100));
        // const payed = await openPaymentSheet();
        // if (!payed) {
        //     return;
        // }

        insertOrder(
            { total },
            {
                onSuccess: saveOrderItems,
            }
        );
    };

    const saveOrderItems = (order: Tables<'orders'>) => {
        const orderItems = items.map((cartItem) => ({
            order_id: order.id,
            product_id: cartItem.product_id,
            quantity: cartItem.quantity,
            /*size: cartItem.size,*/
        }));

        insertOrderItems(orderItems, {
            onSuccess() {
                clearCart();
                router.push(`/(user)/orders/${order.id}`);
            },
        });
    };

    return (
        <CartContext.Provider
            value={{ items, addItem, updateQuantity, total, totalQuantity, checkout }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
