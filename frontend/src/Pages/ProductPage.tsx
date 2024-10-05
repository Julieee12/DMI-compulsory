import React, {FC, useEffect} from 'react';
import image from '../assets/logo.png'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';
import { productAtom } from '../Atoms/Atoms';
import { useAtom } from 'jotai';
import {fetchProducts} from "../Services/ProductService";
// import {ProductList} from "../Services/ProductService";


interface ProductViewProps {}

const ProductPage: FC<ProductViewProps> = () => {

    const[products, setProducts] = useAtom(productAtom);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const fetchedProducts = await fetchProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        loadProducts() ;
    }, [setProducts]);









    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/');
    };

    // const goToOrdersPage = () => {
    //     navigate('/orders');
    // };

    return (
        <>
            <div>
                <h2 className="text-xl font-semi">Available Paper:</h2>

                <div
                    className="max-h-64 overflow-y-auto overflow-x-hidden border border-gray-300 rounded-md p-2 pr-6">
                    <ul>
                        {products?.map(products => (
                            <li key={products.id}>
                                <div className="flex justify-between whitespace-nowrap">
                                        <span
                                            className={`flex-1 ${products.isDiscontinued ? 'text-red-900' : ''}`}>{products.name}</span>
                                    {products.stock !== undefined && (
                                        <span
                                            className={`${products.stock > 15 ? 'text-green-500' : products.stock >= 3 ? 'text-yellow-200' : 'text-red-500'}`}><span
                                            className='flex-none text-right'> Availability: </span>
                                        <span className="text-right">{products.stock}</span>
                                    </span>
                                    )}
                                </div>

                                {Array.isArray(products.properties) && (
                                    <ul className="ml-4 text-sm">
                                        {products.properties.map((property, index) => (
                                            <li key={index}>{String(property)}{"<--Broken properties 👍"}</li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


        <div className="container">
            <img src={image} alt="Logo" className="centeredLogo absolute left-64 rotate-6"/>
            <ul className={`menu bg-base-200 rounded-box left-menu`}>
                <li>
                    <a onClick={goToHomePage}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                        </svg>
                        Home
                    </a>
                </li>
                <li>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Products
                    </a>
                </li>
                <li>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                        </svg>
                        Orders
                    </a>
                </li>
            </ul>
        </div>
        </>
    );
};

export default ProductPage;