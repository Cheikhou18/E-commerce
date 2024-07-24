import React, { useEffect, useState } from "react";
import { useAuth } from "../api/auth/admin.js";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from "../api/products.js";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const { user, isAdmin } = useAuth() || {};

  console.log(user, isAdmin);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const request = await getProducts();

    if (request.success) {
      setProducts(request.produits);
    }
  }

  const handleAddProduct = async () => {
    if (!isAdmin) return;

    try {
      await addProduct({
        name: "New Product",
        description: "Product description",
        price: 100,
      });

      fetchProducts();
    } catch (error) {
      console.error("Erreur lors de la création du produit:", error);
    }
  };

  const handleEditProduct = async (id) => {
    if (!isAdmin) return;

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
    if (!isAdmin) return;

    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
    }
  };

  return (
    <div>
      <h1>Product </h1>
      {isAdmin && <button onClick={handleAddProduct}>Add Product</button>}
      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}
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
