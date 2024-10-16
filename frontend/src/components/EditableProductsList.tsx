import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { productAtom } from "../Atoms/Atoms";
import { fetchProducts, updateProduct } from "../Services/ProductService";
import { ProductDto } from "../Api";

const EditableProductsList: React.FC = () => {
    const [products, setProducts] = useAtom(productAtom);
    const [editingProduct, setEditingProduct] = useState<{ [key: number]: Partial<ProductDto> }>({});

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const fetchedProducts = await fetchProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        loadProducts();
    }, [setProducts]);

    const handleStockChange = (productId: number, value: number) => {
        setEditingProduct((prev) => ({
            ...prev,
            [productId]: {
                ...prev[productId],
                stock: value,
            },
        }));
    };

    const handleDiscontinuedChange = (productId: number, value: boolean) => {
        setEditingProduct((prev) => ({
            ...prev,
            [productId]: {
                ...prev[productId],
                isDiscontinued: value,
            },
        }));
    };

    const handleSave = async (productId: number) => {
        const updatedProduct = { ...products.find((p) => p.id === productId), ...editingProduct[productId] };
        try {
            await updateProduct(productId, updatedProduct);

            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === productId ? { ...product, ...editingProduct[productId] } : product
                )
            );

            setEditingProduct((prev) => {
                const { [productId]: _, ...rest } = prev;
                return rest;
            });
        } catch (error) {
            console.error("Error saving product changes:", error);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semi">Editable Products List:</h2>
            <div className="max-h-64 overflow-y-auto overflow-x-hidden border border-gray-300 rounded-md p-2 pr-6">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Price</th>
                        <th className="border border-gray-300 p-2">Stock</th>
                        <th className="border border-gray-300 p-2">Discontinued</th>
                        <th className="border border-gray-300 p-2">Properties</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="border border-gray-300 p-2">{product.name}</td>
                            <td className="border border-gray-300 p-2">{product.price}</td>
                            <td className="border border-gray-300 p-2">
                                <input
                                    type="number"
                                    value={editingProduct[product.id!]?.stock || product.stock}
                                    onChange={(e) => handleStockChange(product.id!, parseInt(e.target.value, 10))}
                                    className="w-full p-1 border rounded"
                                />
                            </td>
                            <td className="border border-gray-300 p-2">
                                <input
                                    type="checkbox"
                                    checked={editingProduct[product.id!]?.isDiscontinued ?? product.isDiscontinued}
                                    onChange={(e) => handleDiscontinuedChange(product.id!, e.target.checked)}
                                />
                            </td>
                            <td className="border border-gray-300 p-2">{product.properties}</td>
                            <td className="border border-gray-300 p-2">
                                <button
                                    onClick={() => handleSave(product.id!)}
                                    className="bg-blue-500 text-white p-1 rounded"
                                >
                                    Save
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EditableProductsList;
