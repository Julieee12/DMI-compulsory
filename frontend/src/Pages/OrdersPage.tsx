import React, { useEffect, useState } from "react";
import { productAtom } from "../Atoms/Atoms";
import { useAtom } from "jotai";
import { fetchProducts } from "../Services/ProductService";
import { useParams } from "react-router-dom";
import { postOrder } from "../Services/OrderService";

const OrdersPage: React.FC = () => {
    const routeParams = useParams<{ id: string }>();
    const [products, setProducts] = useAtom(productAtom);
    const [deliveryDate, setDeliveryDate] = useState<Date | undefined>();
    const [quantities, setQuantities] = useState<Map<number, number>>(new Map());
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortOption, setSortOption] = useState<string>("name");

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

    const handleOrderSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Collect order items from quantities map
        const orderItems = Array.from(quantities.entries())
            .filter(([_, quantity]) => quantity > 0)
            .map(([productId, quantity]) => ({
                productId,
                quantity,
            }));

        // Validate that there are order items and a delivery date
        if (orderItems.length === 0) {
            console.error("No items to order.");
            return;
        }

        if (!deliveryDate) {
            console.error("Delivery date is required.");
            return;
        }

        if (!routeParams.id) {
            console.error("Customer ID is missing.");
            return;
        }

        // Prepare the order object
        const newOrder = {
            deliveryDate: deliveryDate.toISOString(), // Ensure it's in ISO format
            customerId: parseInt(routeParams.id),
            orderEntries: orderItems,
        };

        console.log("Creating order:", newOrder); // Log the order for debugging

        try {
            // Make the post request
            await postOrder(newOrder);
            console.log("Order placed successfully!");
        } catch (error) {
            console.error("Error placing order:", error); // Log any errors
        }
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
                                <tr key={product.id}>
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
                                                if (quantity === 0) {
                                                    quantities.delete(product.id!); // Remove entry if quantity is zero
                                                } else {
                                                    quantities.set(product.id!, quantity); // Set quantity
                                                }
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

                <form onSubmit={handleOrderSubmit}>
                    <div className={"flex flex-row justify-between"}>
                        Delivery Date:
                        <input type={"date"} onChange={(e) => setDeliveryDate(new Date(e.target.value))} />
                        <button type="submit">Place Order</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default OrdersPage;
