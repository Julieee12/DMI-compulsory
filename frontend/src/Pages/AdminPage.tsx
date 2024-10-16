import React, {useEffect, useState} from "react";
import { postCustomer } from "../Services/CustomerService";
import { postProduct } from "../Services/ProductService";
import CustomersList from "../components/CustomersList";
import ProductsList from "../components/ProductsList";
import "../Styles/retro.css";
import OrdersList from "../components/OrdersList";
import {orderAtom} from "../Atoms/Atoms";
import {useAtom} from "jotai";
import {fetchOrders} from "../Services/OrderService"; // This CSS file will contain some retro-specific styles.

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
// Orders list
    const [orders, setOrders] = useAtom(orderAtom);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const fetchedOrders = await fetchOrders();
                setOrders(fetchedOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        loadOrders();
    }, [setOrders]);

    return (
        <div className="admin-container" style={{ display: "flex", margin: "8px" }}>
            {/* Left Menu */}
            <div className="retro-left-menu">
                <h2>Dunder Mifflin Menu</h2>
                <ul style={{ listStyle: "disc", padding: "10px" }}>
                    <li><a href="/" style={{ textDecoration: "none", color: "blue" }}>Home</a></li>
                    <li><a href="/customerpage" style={{ textDecoration: "none", color: "blue" }}>Customers</a></li>
                    <li><a href="/adminpage" style={{ textDecoration: "none", color: "blue" }}>Admin</a></li>
                </ul>
            </div>

            {/* Main Admin Page Content */}
            <div className="admin-main-content" style={{
                flex: 1,
                padding: "20px",
                border: "2px solid black",
                backgroundColor: "#f3f3f3",
                fontFamily: "Courier New, monospace"
            }}>
                <h1 style={{textAlign: "center", color: "red", fontWeight: "bold"}}>Dunder Mifflin Admin Page</h1>
                <hr style={{marginBottom: "20px", border: "1px solid black"}}/>

                <h2 style={{backgroundColor: "yellow", padding: "5px"}}>Create a New Customer</h2>
                <form style={{marginBottom: "20px", border: "1px solid #333", padding: "10px", backgroundColor: "#fff"}}
                      onSubmit={handleCustomerSubmit}>
                    <div style={{marginBottom: "10px"}}>
                        <label htmlFor="name"><b>Name:</b></label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{width: "100%", padding: "5px", marginTop: "5px"}}
                        />
                    </div>
                    <div style={{marginBottom: "10px"}}>
                        <label htmlFor="address"><b>Address:</b></label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            style={{width: "100%", padding: "5px", marginTop: "5px"}}
                        />
                    </div>
                    <div style={{marginBottom: "10px"}}>
                        <label htmlFor="email"><b>Email:</b></label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{width: "100%", padding: "5px", marginTop: "5px"}}
                        />
                    </div>
                    <div style={{marginBottom: "10px"}}>
                        <label htmlFor="phone"><b>Phone:</b></label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            style={{width: "100%", padding: "5px", marginTop: "5px"}}
                        />
                    </div>
                    <button type="submit"
                            style={{backgroundColor: "lime", padding: "10px", border: "2px solid black"}}>Create
                        Customer
                    </button>
                </form>

                <h2 style={{backgroundColor: "yellow", padding: "5px"}}>Add a New Product</h2>
                <form style={{border: "1px solid #333", padding: "10px", backgroundColor: "#fff"}}
                      onSubmit={handleProductSubmit}>
                    <div style={{marginBottom: "10px"}}>
                        <label htmlFor="productName"><b>Product Name:</b></label>
                        <input
                            type="text"
                            id="productName"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                            style={{width: "100%", padding: "5px", marginTop: "5px"}}
                        />
                    </div>
                    <div style={{marginBottom: "10px"}}>
                        <label htmlFor="price"><b>Price:</b></label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            style={{width: "100%", padding: "5px", marginTop: "5px"}}
                        />
                    </div>
                    <div style={{marginBottom: "10px"}}>
                        <label htmlFor="stock"><b>Stock:</b></label>
                        <input
                            type="number"
                            id="stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                            style={{width: "100%", padding: "5px", marginTop: "5px"}}
                        />
                    </div>
                    <div style={{marginBottom: "10px"}}>
                        <label htmlFor="properties"><b>Description:</b></label>
                        <input
                            type="text"
                            id="properties"
                            value={properties}
                            onChange={(e) => setProductProperties(e.target.value)}
                            required
                            style={{width: "100%", padding: "5px", marginTop: "5px"}}
                        />
                    </div>
                    <div style={{marginBottom: "10px"}}>
                        <label htmlFor="isDiscontinued"><b>Discontinued:</b></label>
                        <input
                            type="checkbox"
                            id="isDiscontinued"
                            checked={isDiscontinued}
                            onChange={(e) => setIsDiscontinued(e.target.checked)}
                            style={{marginLeft: "10px"}}
                        />
                    </div>
                    <button type="submit"
                            style={{backgroundColor: "lime", padding: "10px", border: "2px solid black"}}>Add Product
                    </button>
                </form>

                <div style={{marginTop: "30px", padding: "10px", border: "2px dashed red"}}>
                    <h3>Customer List</h3>
                    <CustomersList/>
                </div>

                <div style={{marginTop: "30px", padding: "10px", border: "2px dashed blue"}}>
                    <h3>Product List</h3>
                    <ProductsList/>
                </div>

                <div style={{marginTop: "30px", padding: "10px", border: "2px dashed blue"}}>
                    <h3>Product List</h3>
                    <OrdersList orders={orders}/>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
