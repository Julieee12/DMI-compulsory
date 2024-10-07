import axios from "axios";
// import {Api, CustomerDto} from "../Api";
const apiBaseUrl = "http://localhost:5280/api/Customers";

export const fetchCustomers = async () => {
    const response = await axios.get(apiBaseUrl);
    return response.data;
}

export const postCustomer = async (customer: any) => {
    const response = await axios.post(apiBaseUrl, customer);
    return response.data;
}

export const fetchCustomer = async (id: number) => {
    const response = await axios.get(`${apiBaseUrl}/${id}`);
    return response.data;}