
import React, { useState } from "react";
// Import the categories list for the dropdown
import { categories } from "./AdminDashboard"; 
import "../Styles/AddProduct.css"; // Reuse the same CSS

// EditProduct receives the product object, a save handler, and a cancel handler
const EditProduct = ({ product, onSave, onCancel }) => {
    
    // Initialize form state with the properties of the product being edited
    const [form, setForm] = useState({
        // Include the product's ID (hidden from user)
        id: product.id,
        name: product.name,
        description: product.description || "",
        // The category must match the name string
        category: product.category, 
        imageUrl: product.imageUrl || "",
        // Ensure numbers are treated as strings for the form input
        stock: String(product.stock || 0),
        price: String(product.price),
        discount: String(product.discount || 0),
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!form.name || !form.price || !form.category) {
            alert("Please fill in all required fields (Name, Price, and Category)");
            return;
        }

        const editedProduct = {
            // Keep the original ID
            id: form.id, 
            name: form.name,
            description: form.description,
            category: form.category,
            imageUrl: form.imageUrl,
            
            // Convert numeric fields back to numbers for storage
            stock: parseFloat(form.stock) || 0,
            price: parseFloat(form.price),       
            discount: parseFloat(form.discount) || 0,
        };

        // Call the save handler passed from App.js
        onSave(editedProduct); 
    };

    return (
        <div className="ap-page-background font-sans">
            <div className="ap-container">
                {/* Updated Header for editing */}
                <h2 className="ap-header">Edit Product: {product.name} (ID: {product.id})</h2>

                <div className="ap-card">
                    <form id="edit-product-form" className="ap-form-grid" onSubmit={handleSubmit}>
                        <div>
                            {/* Product Name */}
                            <div className="ap-field">
                                <label className="ap-label">Product Name</label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="ap-input"
                                    required
                                />
                            </div>
                            {/* Description */}
                            <div className="ap-field">
                                <label className="ap-label">Description</label>
                                <input
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    className="ap-input"
                                />
                            </div>

                            {/* Category Dropdown */}
                            <div className="ap-field">
                                <label className="ap-label">Category</label>
                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="ap-input"
                                    required
                                >
                                    <option value="" disabled>Select a category</option>
                                    {Object.values(categories).map((name) => (
                                        <option key={name} value={name}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            {/* Image URL */}
                            <div className="ap-field">
                                <label className="ap-label">Image URL</label>
                                <input
                                    name="imageUrl"
                                    value={form.imageUrl}
                                    onChange={handleChange}
                                    className="ap-input"
                                />
                            </div>
                        </div>

                        {/* Right Column (Stock, Price, Discount) */}
                        <div>
                            <div className="ap-field">
                                <label className="ap-label">Stock</label>
                                <input
                                    name="stock"
                                    type="number"
                                    value={form.stock}
                                    onChange={handleChange}
                                    className="ap-input"
                                />
                            </div>

                            <div className="ap-field">
                                <label className="ap-label">Price (₱)</label>
                                <input
                                    name="price"
                                    type="number"
                                    value={form.price}
                                    onChange={handleChange}
                                    className="ap-input"
                                    required
                                />
                            </div>

                            <div className="ap-field">
                                <label className="ap-label">Discount (%)</label>
                                <input
                                    name="discount"
                                    type="number"
                                    value={form.discount}
                                    onChange={handleChange}
                                    className="ap-input"
                                />
                            </div>
                            <div className="ap-field-spacer"></div>
                        </div>
                    </form>

                    <div className="ap-actions">
                        <button type="submit" form="edit-product-form" className="ap-btn ap-btn-create">
                            Save Changes
                        </button>
                        {/* Wires up the Cancel action */}
                        <button type="button" className="ap-btn ap-btn-cancel" onClick={onCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;