import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/authentification.js';

const Product = () => {
    const [products, setProducts] = useState([]);
    const { user, isAdmin } = useAuth() || {};

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data.produits);
        } catch (error) {
            console.error('Erreur lors de la récupération des produits:', error);
        }
    };

    const handleAddProduct = async () => {
        if (!isAdmin) return;

        try {
            await axios.post('/api/products', {
                name: 'New Product',
                description: 'Product description',
                price: 100
            });
            fetchProducts();
        } catch (error) {
            console.error('Erreur lors de l\'ajout du produit:', error);
        }
    };

    const handleEditProduct = async (id) => {
        if (!isAdmin) return;

        try {
            await axios.put(`/api/products/${id}`, {
                name: 'Updated Product',
                description: 'Updated description',
                price: 150
            });
            fetchProducts(); 
        } catch (error) {
            console.error('Erreur lors de la modification du produit:', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!isAdmin) return;

        try {
            await axios.delete(`/api/products/${id}`);
            fetchProducts(); 
        } catch (error) {
            console.error('Erreur lors de la suppression du produit:', error);
        }
    };

    return (
        <div>
            <h1>Product </h1>
            {isAdmin && <button onClick={handleAddProduct}>Add Product</button>}
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.price}
                        {isAdmin && (
                            <>
                                <button onClick={() => handleEditProduct(product.id)}>Edit</button>
                                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Product;
