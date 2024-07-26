import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/admin";
import Navbar from "../components/navbar";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from "../api/products";
import ProductForm from "../components/productForm";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
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

  const handleAddProduct = async (data) => {
    try {
      await addProduct(data);
      fetchProducts();
      setFormVisible(false);
    } catch (error) {
      console.error("Erreur lors de la création du produit:", error);
    }
  };

  const handleEditProduct = async (data) => {
    try {
      await editProduct(selectedProduct.id, data);
      fetchProducts();
      setFormVisible(false);
      setSelectedProduct(null);
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

  const openFormToAdd = () => {
    setSelectedProduct(null);
    setFormVisible(true);
  };

  const openFormToEdit = (product) => {
    setSelectedProduct(product);
    setFormVisible(true);
  };

  return (
    <div>
      <Navbar/>
      <h1>Products</h1>

      <button onClick={openFormToAdd}>Add Product</button>

      {isFormVisible && (
        <ProductForm
          product={selectedProduct}
          onSubmit={selectedProduct ? handleEditProduct : handleAddProduct}
        />
      )}

      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}€
            {isAdmin && (
              <>
                <button onClick={() => openFormToEdit(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
