import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import {customerSelectedAtom, orderAtom} from "../Atoms/Atoms";
import {fetchCustomerOrders, fetchOrders} from "../Services/OrderService";
import {useAtom} from "jotai";
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
    }, [setOrders]);

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
                <h1>Customer Detail Page</h1>
                <p>Customer ID: {id}</p>
                {/* Fetch and display customer details using the ID */}
            </div>
            <a className={"retro-button"} href={`/customer/${id}/orders`}>Place/See Orders</a>
            <OrdersList orders={orders}/>
        </>
)
    ;
};

export default CustomerDetailPage;