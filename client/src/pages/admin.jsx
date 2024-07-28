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
import ProductForm from "../components/productForm";
import Navbar from "../components/navbar";

function Admin() {
  const [products, setProducts] = useState();
  const [newCategory, setNewCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
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

  function displayMessage(field, mess) {
    setMessage((currMessages) => {
      return { ...currMessages, [field]: mess };
    });

    // Clears the message after 2 seconds
    return setTimeout(() => setMessage({ ...message, [field]: "" }), 2 * 1000);
  }

  const handleAddProduct = async (data) => {
    const request = await addProduct(data);
    if (request.success) {
      fetchProducts();
    }

    displayMessage("products", request.message);
    setFormVisible(false);
  };

  const handleEditProduct = async (data) => {
    const request = await editProduct(selectedProduct.id, data);
    if (request.success) {
      fetchProducts();
    }

    displayMessage("products", request.message);
    setFormVisible(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = async (id) => {
    const request = await deleteProduct(id);

    if (request.success) {
      displayMessage("products", request.message);
      fetchProducts();
    }
  };

  function openFormToAdd() {
    setSelectedProduct(null);
    setFormVisible(true);
  }

  function openFormToEdit(product) {
    setSelectedProduct(product);
    setFormVisible(true);
  }

  async function handleCategoryForm(e) {
    e.preventDefault();

    if (newCategory === "")
      return displayMessage("categories", "Please insert a name");

    const request = await createCategory(newCategory);
    setMessage(request.message);

    setTimeout(() => setMessage({ ...message, categories: "" }), 2 * 1000);
  }

  return (
    <div className="flex flex-col gap-6">
      <Navbar />
      <h3>Categories</h3>

      <form onSubmit={(e) => handleCategoryForm(e)}>
        <div className="flex flex-col gap-2 w-fit">
          <label>Create a category</label>
          <input
            type="text"
            placeholder="Category name..."
            className="border rounded-sm px-4 py-2"
            onChange={(e) => setNewCategory(e.target.value)}
          />

          {message.categories}

          <button className="border rounded-xl px-4 py-2">
            Create category
          </button>
        </div>
      </form>

      <h3>Products</h3>

      <button onClick={openFormToAdd}>Add Product</button>

      {isFormVisible && (
        <ProductForm
          product={selectedProduct}
          onSubmit={selectedProduct ? handleEditProduct : handleAddProduct}
        />
      )}

      {message.products}

      <ul>
        {products?.map((product) => (
          <li className="border-t p-4" key={product.id}>
            {product.name} - {product.price}€
            <div>
              <button onClick={() => openFormToEdit(product)}>Edit</button>
              <button onClick={() => handleDeleteProduct(product.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
