import React from "react";
import CustomersList from "../components/CustomersList";
import "../Styles/retro.css"; // Assuming you are adding new styles in retro.css or a new CSS file

const CustomerPage: React.FC = () => {
    return (
        <div className="customer-page-container">
            <h1 className="customer-page-header">Okay, but which one?</h1>
            <h2>Click on your name and pinky promise you won't leak the other customer's personal data!</h2>
            <CustomersList />
        </div>
    );
}

export default CustomerPage;
