import {useNavigate} from "react-router-dom";
import React from "react";

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const goToAdminPage = () => {
        navigate('/adminpage');
    };

    const goToOrderPage = () => {
        navigate('/customerpage');
    };

    const goToProductPage = () => {
        navigate('/products');
    };

        return (
            <div>
                <h1>Home Page</h1>
                <button onClick={goToAdminPage}>Admin Page</button>
                <button onClick={goToOrderPage}>Customer Page</button>
                <button onClick={goToProductPage}>Product Page</button>
            </div>
        );
    };

    export default HomePage;
