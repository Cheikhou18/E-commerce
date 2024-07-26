import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/admin";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from "../api/products.js";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { isAdmin } = useAuth() || {};

  useEffect(() => {
    if (isAdmin === false) return navigate("/");

    fetchProducts();
  }, []);

  async function fetchProducts() {
    const request = await getProducts();

    if (request.success) {
      setProducts(request.produits);
    }
  }

  const handleAddProduct = async () => {
    try {
      await addProduct({
        name: "New Product 3",
        description: "Product description",
        id_category: 1,
        image: "",
        price: 100,
        stock: 20,
      });

      fetchProducts();
    } catch (error) {
      console.error("Erreur lors de la création du produit:", error);
    }
  };

  const handleEditProduct = async (id) => {
    try {
      await editProduct(id, {
        name: "Updated Product",
        description: "Updated description",
        price: 150,
      });

      fetchProducts();
    } catch (error) {
      console.error("Erreur lors de la modification du produit:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
    }
  };

  return (
    <div>
      <h1>Products</h1>

      <button onClick={handleAddProduct}>Add Product</button>

      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}€
            {isAdmin && (
              <>
                <button onClick={() => handleEditProduct(product.id)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
