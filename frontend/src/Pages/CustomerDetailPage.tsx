import React from "react";
import { useParams } from "react-router-dom";
import {customerSelectedAtom} from "../Atoms/Atoms";

const CustomerDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h1>Customer Detail Page</h1>
            <p>Customer ID: {id}</p>
            {/* Fetch and display customer details using the ID */}
        </div>
    );
};

export default CustomerDetailPage;