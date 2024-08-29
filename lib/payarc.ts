import { Alert } from "react-native";
import supabase from "./supabase";

//Customers
export const PayarcCustomerAdd = async () => {
    const { data, error } = await supabase.functions.invoke("customer-add", {
        // method: "POST",
        body: {
            customer: { name: "Ziki", email: "naxxnana@baba.com" },
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
    const { data: result, error } = await supabase.functions.invoke(
        "customer-update",
        {
            body: { object_id: payarcObjectId, data },
        },
    );
    if (result && result.errorCode) {
        console.log(
            "Error from PayarcCustomerAdd",
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
