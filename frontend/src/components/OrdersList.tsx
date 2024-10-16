import React from "react";
import {OrderDto} from "../Api";

// Define props for OrdersList
interface OrdersListProps {
    orders: OrderDto[];
}

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
    return (
        <div>
            <h2 className="text-xl font-semi">Available Orders:</h2>
            <div className="max-h-64 overflow-y-auto overflow-x-hidden border border-gray-300 rounded-md p-2 pr-6">
                <ul>
                    {orders?.map(order => (
                        <li key={order.id}>
                            <div className="flex justify-between whitespace-nowrap">
                                <span className="flex-1">{order.customerId}</span>
                                <span className="flex-none text-right">Total: {order.totalAmount}</span>
                            </div>
                            {Array.isArray(order.orderEntries) && (
                                <ul className="ml-4 text-sm">
                                    {order.orderEntries.map((item, index) => (
                                        <li key={index}>{item.productId} - Quantity: {item.quantity}</li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default OrdersList;
