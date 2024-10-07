import React, { useEffect } from "react";
import ProductsList from "../components/ProductsList";
import { productAtom } from "../Atoms/Atoms";
import { useAtom } from "jotai";
import { fetchProducts } from "../Services/ProductService";
import { useParams } from "react-router-dom";

const OrdersPage: React.FC = () => {
    const routeParams = useParams<{ id: string }>();
    const [products, setProducts] = useAtom(productAtom);
    const [deliveryDate, setDeliveryDate] = React.useState<Date>();
    const [quantities, setQuantities] = React.useState<Map<number, number>>(new Map());

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const fetchedProducts = await fetchProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        loadProducts();
    }, [setProducts]);

    const placeOrder = () => {
        const orderItems = Array.from(quantities.entries())
            .filter(([_, quantity]) => quantity > 0) // Filter out products with zero quantity
            .map(([productId, quantity]) => ({
                productId,
                quantity,
            }));

        const dto = {
            deliveryDate: deliveryDate,
            customerId: parseInt(routeParams.id!),
            orderItems: orderItems, // Only include products with a specified quantity
        };

        console.log(dto);
    };

    return (
        <>
            <div className="retro-left-menu">
                <h2>Dunder Mifflin Menu</h2>
                <ul style={{listStyle: "disc", padding: "10px"}}>
                    <li><a href="/" style={{textDecoration: "none", color: "blue"}}>Home</a></li>
                    <li><a href="/customerpage" style={{textDecoration: "none", color: "blue"}}>Customers</a></li>

                </ul>
            </div>
            <div>
                <h1>Place Order</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    onChange={(e) => {
                                        const quantity = parseInt(e.target.value) || 0;
                                        if (quantity === 0) {
                                            quantities.delete(product.id!); // Remove entry if quantity is zero
                                        } else {
                                            quantities.set(product.id!, quantity); // Set quantity
                                        }
                                        setQuantities(new Map(quantities)); // Update state
                                    }}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className={"flex flex-row justify-between"}>
                    Delivery Date:
                    <input type={"date"} onChange={(e) => setDeliveryDate(new Date(e.target.value))}/>
                    <button onClick={placeOrder}>Place Order</button>
                </div>
            </div>
        </>
    );
};

export default OrdersPage;
