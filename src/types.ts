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
export type GAddress = {
    description: string;
    place_id?: string;
    latitude?: number;
    longitude?: number;
    [key: string]: any;
};
export type CCard = {
    object?: string | null;
    id?: string | null;
    address1?: string | null;
    address2?: string | null;
    card_source?: string | null;
    card_holder_name?: string | null;
    is_default?: number | null;
    exp_month?: string | null;
    exp_year?: string | null;
    cvv?: number | null;
    card_number?: number | null;
    is_verified?: number | null;
    fingerprint?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    brand?: string | null;
    last4digit?: string | null;
    first6digit?: string | null;
    country?: string | null;
    avs_status?: string | null;
    cvc_status?: string | null;
    address_check_passed?: number | null;
    zip_check_passed?: 0;
    customer_id?: string | null;
    created_at?: number | null;
    updated_at?: number | null;
    // Allows additional attributes of any type
    [key: string]: any;
};

export type Customer = {
    id?: string | null;
    object_id?: string | null;
    object?: string;
    customer_id?: string;
    name?: string;
    email?: string;
    description?: string;
    payment_overdue?: number;
    send_email_address?: string;
    cc_email_address?: string;
    source_id?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    state?: string;
    zip?: string;
    phone?: string;
    country?: string;
    created_at?: number;
    updated_at?: number;
    readable_created_at?: string;
    readable_updated_at?: string;
    invoice_prefix?: string;
    // Allows additional attributes of any type
    [key: string]: any;
};
