import axios from "axios";


const apiBaseUrl = "http://localhost:5280/api/Orders";

export const fetchOrders = async () => {
    const response = await axios.get(apiBaseUrl);
    return response.data;
}

export const postOrder = async (order: any) => {
    const response = await axios.post(apiBaseUrl, order);
    return response.data;
}