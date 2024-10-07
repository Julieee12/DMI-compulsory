import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { customerAtom } from "../Atoms/Atoms";
import {customerSelectedAtom} from "../Atoms/Atoms";
import { fetchCustomers } from "../Services/CustomerService";
import { Link } from "react-router-dom";

const CustomersList: React.FC = () => {
    const [customers, setCustomers] = useAtom(customerAtom);

    useEffect(() => {
        const loadCustomers = async () => {
            try {
                const fetchedCustomers = await fetchCustomers();
                setCustomers(fetchedCustomers);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };
        loadCustomers();
    }, [setCustomers]);

    return (
        <div>
            <h2>Customer List</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer) => (
                    <tr key={customer.id}>
                        <td>
                            <Link to={`/customer/${customer.id}`}>{customer.name}</Link>
                        </td>
                        <td>{customer.address}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomersList;