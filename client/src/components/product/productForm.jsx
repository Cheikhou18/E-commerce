import React, { useState, useEffect } from "react";

const ProductForm = ({ product, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    id_category: "",
    recommended: false,
    color: null,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock || "",
        image: product.image || "",
        id_category: product.id_category || "",
        recommended: product.recommended || false,
        color: product.color || null,
        discount: product.discount || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      image: "",
      id_category: "",
      recommended: false,
      color: null,
      discount:"",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Price</label>
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Stock</label>
        <input
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Image</label>
        <input name="image" value={formData.image} onChange={handleChange} />
      </div>
      <div>
        <label>Category ID</label>
        <input
          name="id_category"
          type="number"
          value={formData.id_category}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Recommended</label>
        <input
          name="recommended"
          type="checkbox"
          checked={formData.recommended}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Color</label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Discount</label>
        <input
          name="discount"
          type="number"
          value={formData.discount}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
