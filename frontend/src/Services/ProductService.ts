import axios from "axios";
import ProductsList from "../components/ProductsList";
import productsList from "../components/ProductsList";
import {ProductDto} from "../Api";
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

export const updateProduct = async (productId: number, updatedProduct: Partial<ProductDto>): Promise<void> => {
    try {
        await axios.put(`${apiBaseUrl}/${productId}`, updatedProduct);
    } catch (error) {
        console.error("Error updating product", error);
        throw error;
    }
};

