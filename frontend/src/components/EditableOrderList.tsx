import React, {useEffect, useState} from "react";
import { OrderDto, OrderStatusDto } from "../Api"; // Assuming OrderDto and OrderStatusDto are imported correctly
import {fetchOrders, updateOrderStatus} from "../Services/OrderService";
import {orderAtom, orderStatusAtom} from "../Atoms/Atoms"; // Assuming this service is responsible for the update call
import {useAtom} from "jotai";
import {fetchOrderStatuses} from "../Services/OrderStatusService";

interface OrdersListProps {
    orders: OrderDto[];

}

const EditableOrderList: React.FC<OrdersListProps> = ({ orders }) => {
    const [orderStatuses, setOrderStatuses] = useAtom(orderStatusAtom);

    useEffect(() => {
        const loadOrderStatuses = async () => {
            try {
                const fetchedOrderStatuses = await fetchOrderStatuses();
                setOrderStatuses(fetchedOrderStatuses);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        loadOrderStatuses();
    }, [setOrderStatuses]);



    const handleStatusChange = async (orderId: number, newStatusId: number) => {
        try {
            // Send the new status to the backend to update the order
            await updateOrderStatus(orderId, newStatusId);
            console.log(`Order ${orderId} status updated to ${newStatusId}`);
        } catch (error) {
            console.error("Failed to update order status", error);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semi">Available Orders:</h2>
            <div className="max-h-64 overflow-y-auto overflow-x-hidden border border-gray-300 rounded-md p-2 pr-6">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Order ID</th>
                        <th className="border border-gray-300 p-2">Customer ID</th>
                        <th className="border border-gray-300 p-2">Order Date</th>
                        <th className="border border-gray-300 p-2">Delivery Date</th>
                        <th className="border border-gray-300 p-2">Total Amount</th>
                        <th className="border border-gray-300 p-2">Status</th>
                        <th className="border border-gray-300 p-2">Order Entries</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td className="border border-gray-300 p-2">{order.id}</td>
                            <td className="border border-gray-300 p-2">{order.customerId}</td>
                            <td className="border border-gray-300 p-2">{order.orderDate}</td>
                            <td className="border border-gray-300 p-2">{order.deliveryDate}</td>
                            <td className="border border-gray-300 p-2">{order.totalAmount}</td>
                            <td className="border border-gray-300 p-2">
                                <select
                                    className="border border-gray-300 p-1 rounded"
                                    value={order.status?.id || ""}
                                    onChange={(e) => handleStatusChange(order.id!, parseInt(e.target.value))}
                                >
                                    <option value="" disabled>Select Status</option>
                                    {orderStatuses.map(status => (
                                        <option key={status.id} value={status.id}>
                                            {status.status}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td className="border border-gray-300 p-2">
                                <ul className="list-disc list-inside">
                                    {order.orderEntries?.map((entry, index) => (
                                        <li key={index}>
                                            Product: {entry.productId}, Quantity: {entry.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EditableOrderList;
