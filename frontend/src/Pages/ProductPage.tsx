import React, { FC } from 'react';
import image from '../assets/logo.png'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';
import ProductsList from '../components/ProductsList';

interface ProductViewProps {}

const ProductPage: FC<ProductViewProps> = () => {

    return (
        <div className="container">
            {/* Display the ProductsList */}
            <ProductsList />

            {/* Logo and Navigation Menu */}
            <img src={image} alt="Logo" className="centeredLogo absolute left-64 rotate-6" />

        </div>
    );
};

export default ProductPage;
