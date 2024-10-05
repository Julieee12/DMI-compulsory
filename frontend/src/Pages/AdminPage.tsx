import React, { useState } from "react";
import { postCustomer } from "../Services/CustomerService";
import { postProduct } from "../Services/ProductService";
import CustomersList from "../components/CustomersList";
import ProductsList from "../components/ProductsList";

const AdminPage: React.FC = () => {
    // State variables for customer
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    // State variables for product
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [isDiscontinued, setIsDiscontinued] = useState(false);
    const [properties, setProductProperties] = useState("");

    // Handle customer form submission
    const handleCustomerSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const newUser = { name, address, email, phone };
        console.log("Creating user:", newUser);
        postCustomer(newUser);
    };

    // Handle product form submission
    const handleProductSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const newProduct = { name: productName, price: parseFloat(price), stock: parseInt(stock), isDiscontinued, properties };
        console.log("Creating product:", newProduct);
        postProduct(newProduct);
    };

    return (
        <div className={"m-8"}>
            <h1>Admin Page</h1>
            <form className={"flex flex-col space-y-4"} onSubmit={handleCustomerSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Customer</button>
            </form>

            <form className={"flex flex-col space-y-4 mt-8"} onSubmit={handleProductSubmit}>
                <div>
                    <label htmlFor="productName">Product Name:</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="stock">Stock:</label>
                    <input
                        type="number"
                        id="stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="properties">Description:</label>
                    <input
                        type="text"
                        id="properties"
                        value={properties}
                        onChange={(e) => setProductProperties(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="isDiscontinued">Discontinued:</label>
                    <input
                        type="checkbox"
                        id="isDiscontinued"
                        checked={isDiscontinued}
                        onChange={(e) => setIsDiscontinued(e.target.checked)}
                    />
                </div>
                <button type="submit">Create Product</button>
            </form>

            <CustomersList/>
            <ProductsList/>
        </div>
    );
};

export default AdminPage;