import React from "react";
import { useParams } from "react-router-dom";
import {customerSelectedAtom} from "../Atoms/Atoms";

const CustomerDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

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

                {/* Fetch and display customer details using the ID */}
            </div>
            <a className={"retro-button"} href={`/customer/${id}/orders`}>Place/See Orders</a>
        </>
)
    ;
};

export default CustomerDetailPage;