import React, { useEffect, useState } from "react";
import {orderAtom, productAtom} from "../Atoms/Atoms";
import { useAtom } from "jotai";
import { fetchProducts } from "../Services/ProductService";
import { useParams } from "react-router-dom";
<<<<<<< Updated upstream
=======
import { postOrder } from "../Services/OrderService";
import {usethisone} from "../usethisone";
import {CreateOrderDto} from "../Api";
>>>>>>> Stashed changes

const OrdersPage: React.FC = () => {
    const routeParams = useParams<{ id: string }>();
    const [products, setProducts] = useAtom(productAtom);
    const [deliveryDate, setDeliveryDate] = useState<Date | undefined>();
    const [quantities, setQuantities] = useState<Map<number, number>>(new Map());
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortOption, setSortOption] = useState<string>("name");
const [orders, setOrders] = useAtom(orderAtom);
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const fetchedProducts = await fetchProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        loadProducts();
    }, [setProducts]);

    const filteredAndSortedProducts = products
        .filter((product) => {
            return product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .sort((a, b) => {
            if (sortOption === "name") {
                return (a.name ?? "").localeCompare(b.name ?? "");
            } else if (sortOption === "stock") {
                return (a.stock ?? 0) - (b.stock ?? 0);
            } else if (sortOption === "price") {
                return (a.price ?? 0) - (b.price ?? 0);
            }
            return 0;
        });

    const placeOrder = () => {
        const orderItems = Array.from(quantities.entries())
            .filter(([_, quantity]) => quantity > 0)
            .map(([productId, quantity]) => ({
                productId,
                quantity,
            }));

        if (!routeParams.id) {
            console.error("Customer ID is missing.");
            return;
        }

<<<<<<< Updated upstream
        const dto = {
            deliveryDate: deliveryDate,
=======
        // Prepare the order object
        const newOrder: CreateOrderDto = {

            deliveryDate: deliveryDate.toISOString(), // Ensure it's in ISO format
>>>>>>> Stashed changes
            customerId: parseInt(routeParams.id),
            orderItems: orderItems,
        };

<<<<<<< Updated upstream
        console.log(dto);
=======
        console.log("Creating order:", newOrder); // Log the order for debugging

        try {
            // Make the post request
const responsedata = await usethisone.api.ordersCreate(newOrder)
            const resolved = responsedata.data;
            const copyOfProducts = [...orders, resolved];
            setOrders(copyOfProducts)
            console.log("Order placed successfully!");
        } catch (error) {
            console.error("Error placing order:", error); // Log any errors
        }
>>>>>>> Stashed changes
    };

    return (
        <>
            <div className="retro-left-menu">
                <h2>Dunder Mifflin Menu</h2>
                <ul style={{ listStyle: "disc", padding: "10px" }}>
                    <li>
                        <a href="/" style={{ textDecoration: "none", color: "blue" }}>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/customerpage" style={{ textDecoration: "none", color: "blue" }}>
                            Customers
                        </a>
                    </li>
                </ul>
            </div>
            <div className={"min-w-[900px]"}>
                <h1>Place Order</h1>

                {/* Search and Sort Controls */}
                <div>
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ marginRight: "10px" }}
                    />
                    <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
                        <option value="name">Sort by Name</option>
                        <option value="stock">Sort by Stock</option>
                        <option value="price">Sort by Price</option>
                    </select>
                </div>

                {/* Product List Container */}
                <div className="product-list-container ">
                    <table className={"w-full"}>
                        <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredAndSortedProducts.length > 0 ? (
                            filteredAndSortedProducts.map((product) => (
                                <tr
                                    // key={product["id"]}

                                >
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="Quantity"
                                            onChange={(e) => {
                                                const quantity = parseInt(e.target.value) || 0;
                                                // if (quantity === 0) {
                                                //     quantities.delete(product?["id"]); // Remove entry if quantity is zero
                                                // } else {
                                                //     quantities.set(product["id"]!, quantity); // Set quantity
                                                // }
                                                setQuantities(new Map(quantities)); // Update state
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}>No products match your search.</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

<<<<<<< Updated upstream
                <div className={"flex flex-row justify-between"}>
                    Delivery Date:
                    <input type={"date"} onChange={(e) => setDeliveryDate(new Date(e.target.value))} />
                    <button onClick={placeOrder}>Place Order</button>
                </div>
=======
                    <div className={"flex flex-row justify-between"}>
                        Delivery Date:
                        <input type={"date"} onChange={(e) => setDeliveryDate(new Date(e.target.value))} />
                        <button onClick={handleOrderSubmit} type="submit">Place Order</button>
                    </div>
>>>>>>> Stashed changes
            </div>
        </>
    );
};

export default OrdersPage;
