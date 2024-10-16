import axios from "axios";
import {OrderStatusDto} from "../Api";


const apiBaseUrl = "http://localhost:5280/api/OrderStatus";

export const fetchOrderStatuses = async (): Promise<OrderStatusDto[]> => {
    const response = await axios.get(apiBaseUrl);
    console.log(response.data);
    return response.data;
}