import {customerAtom, productAtom} from "../Atoms/Atoms";
import React, {useEffect} from "react";
import {fetchProducts} from "../Services/ProductService";
import image from "../assets/logo.png";
import {useAtom} from "jotai";


const ProductsList: React.FC = () => {
    const [products, setProducts] = useAtom(productAtom);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const fetchedProducts = await fetchProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        loadProducts();
    }, [setProducts]);

    return (
        <>
            <div>
                <h2 className="text-xl font-semi">Available Products:</h2>

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

        </>

    );
}

    export default ProductsList;