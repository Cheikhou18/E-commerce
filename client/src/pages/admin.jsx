import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/admin";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from "../api/products.js";
import { createCategory } from "../api/auth/admin.js";

const Admin = () => {
  const [products, setProducts] = useState();
  const [newCategory, setNewCategory] = useState();
  const [message, setMessage] = useState({ categories: "", products: "" });

  const navigate = useNavigate();
  const { isAdmin } = useAuth() || {};

  useEffect(() => {
    if (isAdmin === false) return navigate("/");
    fetchProducts();
  }, [isAdmin]);

  async function fetchProducts() {
    const request = await getProducts();
    if (request.success) setProducts(request.produits);
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

  async function handleCategoryForm(e) {
    e.preventDefault();

    const request = await createCategory(newCategory);

    setMessage(request.message);

    // Clears the message after 2 seconds
    setTimeout(() => setMessage({ ...message, categories: "" }), 2 * 1000);
  }

  return (
    <div className="flex flex-col gap-6">
      <h3>Categories</h3>

      <form onSubmit={(e) => handleCategoryForm(e)}>
        <div className="flex flex-col w-fit">
          <label>Create a category</label>
          <input
            type="text"
            placeholder="Category name..."
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </div>

        {message.categories}

        <button>Create category</button>
      </form>

      <h3>Products</h3>

      <button onClick={handleAddProduct}>Add Product</button>

      <ul>
        {products?.map((product) => (
          <li className="border-t p-4" key={product.id}>
            <p>
              {product.name} - {product.price}€
            </p>

            <div>
              <button onClick={() => handleEditProduct(product.id)}>
                Edit
              </button>

              <button onClick={() => handleDeleteProduct(product.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
