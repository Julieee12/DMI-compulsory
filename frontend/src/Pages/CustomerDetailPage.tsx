import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { customerSelectedAtom, orderAtom } from "../Atoms/Atoms";
import { fetchCustomerOrders } from "../Services/OrderService";
import { useAtom } from "jotai";
import OrdersList from "../components/OrdersList";

const CustomerDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [orders, setOrders] = useAtom(orderAtom);

    useEffect(() => {
        const loadOrders = async () => {
            if (!id) {
                throw new Error("No customer ID provided");
            }

            try {
                const fetchedOrders = await fetchCustomerOrders(id);
                setOrders(fetchedOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        loadOrders();
    }, [id, setOrders]);

    return (
        <>
            <div className="retro-left-menu">
                <h2>Dunder Mifflin Menu</h2>
                <ul style={{ listStyle: "disc", padding: "10px" }}>
                    <li><a href="/" style={{ textDecoration: "none", color: "blue" }}>Home</a></li>
                    <li><a href="/customerpage" style={{ textDecoration: "none", color: "blue" }}>Customers</a></li>
                </ul>
            </div>

            <div className="admin-main-content">
                <h1 className="customer-header">See your orders history and order more paper!</h1>

                <OrdersList orders={orders} />
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <a className="retro-button" href={`/customer/${id}/orders`}>
                        Place a new order
                    </a>
                </div>
            </div>
        </>
    );
};

export default CustomerDetailPage;
