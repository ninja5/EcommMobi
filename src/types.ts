import { Database } from "./database.types";

export type Tables<T extends keyof Database["public"]["Tables"]> =
    Database["public"]["Tables"][T]["Row"];

export type InsertTables<T extends keyof Database["public"]["Tables"]> =
    Database["public"]["Tables"][T]["Insert"];

export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
    Database["public"]["Tables"][T]["Update"];

export type Enums<T extends keyof Database["public"]["Enums"]> =
    Database["public"]["Enums"][T];

type Product = Tables<"products">;

export type CartItem = {
    id: string;
    product: Product;
    product_id: number;
    //size: PizzaSize;
    quantity: number;
};

export const OrderStatusList: OrderStatus[] = [
    "About to be created",
    "Not confirmed payment",
    "Confirmed payment",
    "New",
    "Cooking",
    "Delivering",
    "Delivered",
];

export type OrderStatus =
    | "About to be created"
    | "Not confirmed payment"
    | "Confirmed payment"
    | "New"
    | "Cooking"
    | "Delivering"
    | "Delivered";

export type Order = {
    id: number;
    created_at: string;
    total: number;
    user_id: string;
    status: OrderStatus;

    order_items?: OrderItem[];
};

export type OrderItem = {
    id: number;
    product_id: number;
    //products: Product;
    order_id: number;
    //size: PizzaSize;
    quantity: number;
};

export type PlaceAutocompletePrediction = {
    description: string;
    place_id: string;
    matched_substrings: Array<{
        length: number;
        offset: number;
    }>;
    structured_formatting: {
        main_text: string;
        main_text_matched_substrings: Array<{
            length: number;
            offset: number;
        }>;
        secondary_text: string;
    };
    terms: Array<{
        offset: number;
        value: string;
    }>;
    types: string[];
};
