import { Alert } from "react-native";
import supabase from "./supabase";
import { CCard } from "@/src/types";

//Customers
export const PayarcCustomerAdd = async (customer: any) => {
    const { data, error } = await supabase.functions.invoke("customer-add", {
        // method: "POST",
        body: {
            customer: customer,
        },
        // headers: { "Content-Type": "application/json" },
    });
    if (data && data.errorCode) {
        console.log(
            "Error from PayarcCustomerAdd",
            data,
            data.errorDataMessage,
            data.errorList,
        );
        Alert.alert(`Error: ${error?.message ?? "no data"}`);
    }
    if (data) {
        return data;
    }
    return {};
};
export const PayarcCustomerUpdate = async (
    payarcObjectId: string,
    data: any,
) => {
    console.log("hi from PayarcCustomerUpdate data is", data);

    const { data: result, error } = await supabase.functions.invoke(
        "customer-update",
        {
            body: { object_id: payarcObjectId, data },
        },
    );
    if (result && result.errorCode) {
        console.log(
            "Error from PayarcCustomerUpdate",
            result,
            result.errorDataMessage,
            result.errorList,
        );
        Alert.alert(`Error: ${error?.message ?? "no data"}`);
    }
    if (result) {
        return result;
    }
};
export const PayarcCustomerRetrieve = async (
    payarcObjectId: string,
) => {
    const { data: result, error } = await supabase.functions.invoke(
        "customer-retrieve",
        {
            body: { object_id: payarcObjectId },
        },
    );
    if (result && result.errorCode) {
        console.log(
            "Error from PayarcCustomerRetrievee",
            result,
            result.errorDataMessage,
            result.errorList,
        );
        Alert.alert(
            `Error: ${error?.message ?? "PayarcCustomerRetrievee no data"}`,
        );
    }
    if (result) {
        return result;
    }
};
//Credit Cards
export const PayarcAddCreditCard = async (
    payarcObjectId: string,
    cardData: CCard,
) => {
    // const payload = { cards: [data] };
    // return await PayarcCustomerUpdate(payarcObjectId, payload);
    console.log("hi from PayarcAddCreditCard data is", cardData);

    const { data: result, error } = await supabase.functions.invoke(
        "customer-add-ccard",
        {
            body: {
                object_id: payarcObjectId,
                data: {
                    ...cardData,
                    card_source: cardData.card_source || "INTERNET",
                },
            },
        },
    );
    if (result && result.errorCode) {
        console.log(
            "Error from PayarcAddCreditCard",
            result,
            result.errorDataMessage,
            result.errorList,
        );
        Alert.alert(`Error: ${error?.message ?? "no data"}`);
    }
    if (result) {
        delete result.input;
        return result;
    }
};

//Charges
export const PayarcChargeCreate = async (charge: any) => {
    const { data, error } = await supabase.functions.invoke("charge-create", {
        // method: "POST",
        body: {
            charge: charge,
        },
        // headers: { "Content-Type": "application/json" },
    });
    if (data && data.errorCode) {
        console.log(
            "Error from PayarcChargeCreate",
            data,
            data.errorDataMessage,
            data.errorList,
        );
        Alert.alert(`Error PayarcChargeCreate: ${error?.message ?? "no data"}`);
    }
    if (data) {
        return data;
    }
    return {};
};
