import React from "react";
import { OrderDto } from "../Api"; // Assuming OrderDto is imported correctly

interface OrdersListProps {
    orders: OrderDto[];
}

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
    return (
        <div>
            <h2 className="text-xl font-semi">Order history:</h2>
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
                            <td className="border border-gray-300 p-2">{order.status?.status}</td>
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

export default OrdersList;
