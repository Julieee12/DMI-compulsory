import {Api, ProductDto} from "../Api";
const apiBaseUrl = "http://localhost:5280/api";
const api = new Api({baseURL: apiBaseUrl});




export async function ProductList() : Promise<ProductDto[]> {
    const response = await api.api.productsList();
    return response.data;
}