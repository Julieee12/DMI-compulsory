import axios from "axios";


const apiBaseUrl = "http://localhost:5280/api/Orders";

export const fetchOrders = async () => {
    const response = await axios.get(apiBaseUrl);
    console.log(response.data);
    return response.data;
}

export const fetchCustomerOrders = async (customerId: string) => {
    const response = await axios.get(`${apiBaseUrl}/customer/${customerId}`);
    return response.data;
}

export const postOrder = async (order: any) => {
    const response = await axios.post(apiBaseUrl, order);
    return response.data;
}

export const updateOrderStatus = async (orderId: number, newStatusId: number) => {
    const response = await axios.put(`${apiBaseUrl}/${orderId}/status`, newStatusId, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}

