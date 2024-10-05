import axios from "axios";
// import {Api, ProductDto} from "../Api";
const apiBaseUrl = "http://localhost:5280/api/Products";
// const api = new Api({baseURL: apiBaseUrl});


export const fetchProducts = async () => {
    const response = await axios.get(apiBaseUrl);
    return response.data;
}

export const postProduct = async (product: any) => {
    const response = await axios.post(apiBaseUrl, product);
    return response.data;
}
