import { addProduct, deleteProduct, editProduct } from "../api/products.js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/admin";

import AddCategory from "../components/category/createCategory.jsx";
import CategoryCard from "../components/category/categoryCard.jsx";
import ProductForm from "../components/product/productForm.jsx";
import { useCartContext } from "../context/cart/index.js";
import { getCategories } from "../api/categories.js";

function Admin() {
  const { productsInDB, fetchProductsFromDB } = useCartContext();
  const [categories, setCategories] = useState();

  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [message, setMessage] = useState({ categories: "", products: "" });

  const navigate = useNavigate();
  const { isAdmin } = useAuth() || {};

  useEffect(() => {
    if (isAdmin === false) return navigate("/");
    fetchCategories();
  }, [isAdmin]);

  async function fetchCategories() {
    const request = await getCategories();
    if (request.success) setCategories(request.categories);
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
      fetchProductsFromDB();
    }

    displayMessage("products", request.message);
    setFormVisible(false);
  };

  const handleEditProduct = async (data) => {
    const request = await editProduct(selectedProduct.id, data);
    if (request.success) {
      fetchProductsFromDB();
    }

    displayMessage("products", request.message);
    setFormVisible(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = async (id) => {
    const request = await deleteProduct(id);

    if (request.success) {
      displayMessage("products", request.message);
      fetchProductsFromDB();
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

  function isNewProduct(creationDate) {
    const productDate = new Date(creationDate);
    const currentDate = new Date();
    const differenceInTime = currentDate - productDate;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays <= 3;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h3 className="text-xl font-bold p-10">Categories</h3>

        <ul className="flex flex-col">
          {categories?.map((category) => (
            <li key={category.id} className="border-t p-4">
              <CategoryCard
                props={{ category, setMessage, setCategories, fetchCategories }}
              />
            </li>
          ))}

          <li className="flex justify-center border-y py-8">
            <AddCategory props={{ setCategories }} />
          </li>
        </ul>
      </div>

      <h3 className="text-xl font-bold p-10">Products</h3>

      {isFormVisible && (
        <ProductForm
          product={selectedProduct}
          onSubmit={selectedProduct ? handleEditProduct : handleAddProduct}
        />
      )}

      {message.products}

      <ul>
        {productsInDB?.map((product) => (
          <li className="border-t p-4" key={product.id}>
            {product.name} - {product.price}€
            {isNewProduct(product.creation_date.date) && <span> NEW</span>}
            {product.discount > 0 && <span> Discount on!</span>}
            <div className="flex gap-4">
              <button onClick={() => openFormToEdit(product)}>Edit</button>
              <button onClick={() => handleDeleteProduct(product.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}

        <li className="border-y flex justify-center p-8">
          <button onClick={openFormToAdd}>+ Add a product</button>
        </li>
      </ul>
    </div>
  );
}

export default Admin;
