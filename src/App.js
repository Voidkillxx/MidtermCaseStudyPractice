import React, { useEffect, useState } from "react";
import AddProduct from "./pages/AddProduct";
import AdminDashboard, { categories } from "./pages/AdminDashboard"; 
import productsData from "./data/products.json";
import EditProduct from "./pages/EditProduct"; 


// Helper function to ensure all required fields are numbers and categories are names
const formatProducts = (products) => {
    return products.map(p => ({
        ...p,
        price: parseFloat(p.price) || 0,
        stock: parseFloat(p.stock) || 0,
        discount: parseFloat(p.discount) || 0,
        
        // Category mapping fix
        category: p.category 
                  ? String(p.category)
                  : (p.categoryId && categories[p.categoryId]) 
                    ? categories[p.categoryId] 
                    : 'Uncategorized', 
    }));
};

function App() {
    const [products, setProducts] = useState([]);
    const [showPage, setShowPage] = useState("dashboard");
    // State to track the product object currently being edited
    const [editingProduct, setEditingProduct] = useState(null); 

    // Load products from localStorage or sample JSON
    useEffect(() => {
        const stored = localStorage.getItem("products");
        let initialProducts;

        if (stored) {
            initialProducts = JSON.parse(stored);
        } else {
            initialProducts = productsData;
        }
        
        const formattedProducts = formatProducts(initialProducts);

        setProducts(formattedProducts);
        localStorage.setItem("products", JSON.stringify(formattedProducts));
        
    }, []);

    // Helper function to find next sequential ID
    const getNextId = () => {
        if (products.length === 0) {
            return 1;
        }
        // Finds the highest existing ID and adds 1
        const maxId = products.reduce((max, p) => {
            const currentId = parseInt(p.id);
            return currentId > max ? currentId : max;
        }, 0);
        return maxId + 1;
    };

    // Helper to update state and localStorage together
    const updateLocalStorage = (updatedProducts) => {
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
    };


    const handleAddProduct = (newProduct) => {
        
        // Ensures sequential ID is used
        const newId = getNextId();

        const productWithId = { 
            id: newId, 
            ...newProduct 
        };
        
        const updated = [...products, productWithId];
        updateLocalStorage(updated);
        setShowPage("dashboard"); 
    };

    const handleDeleteProduct = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        
        if (confirmDelete) {
            const updatedProducts = products.filter(p => p.id !== id);
            updateLocalStorage(updatedProducts);
        }
    };

    // Starts the edit process: finds the product, sets state, and changes view
    const startEdit = (id) => {
        const productToEdit = products.find(p => p.id === id);
        setEditingProduct(productToEdit);
        setShowPage("edit"); 
    };

    // Handles saving the edited product back into the list
    const handleEditProduct = (editedProduct) => {
        const updatedProducts = products.map(p => 
            p.id === editedProduct.id ? editedProduct : p
        );
        updateLocalStorage(updatedProducts);
        setEditingProduct(null); // Clear editing state
        setShowPage("dashboard"); // Return to dashboard
    };

    // 🚀 NEW/UPDATED: Centralized cancel logic
    const handleCancel = () => {
        setEditingProduct(null); // Clear editing state just in case
        setShowPage("dashboard"); // Navigate to dashboard
    };

    return (
        <div>
            {/* Simple navbar (with inline styles) */}
            <nav
                style={{
                    backgroundColor: "#7bdc7b",
                    color: "white",
                    padding: "1rem 2rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Grocery Admin</h1>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <button
                        onClick={handleCancel}
                        style={{
                            background: showPage === "dashboard" ? "#4CAF50" : "white",
                            color: showPage === "dashboard" ? "white" : "#4CAF50",
                            border: "1px solid #4CAF50",
                            borderRadius: "6px",
                            padding: "0.5rem 1rem",
                            cursor: "pointer",
                            fontWeight: "600",
                        }}
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => setShowPage("add")}
                        style={{
                            background: showPage === "add" ? "#4CAF50" : "white",
                            color: showPage === "add" ? "white" : "#4CAF50",
                            border: "1px solid #4CAF50",
                            borderRadius: "6px",
                            padding: "0.5rem 1rem",
                            cursor: "pointer",
                            fontWeight: "600",
                        }}
                    >
                        Add Product
                    </button>
                </div>
            </nav>

            {/* Render the chosen page */}
            {showPage === "add" ? (
                <AddProduct 
                    onAddProduct={handleAddProduct} 
                    // 🚀 Passed handleCancel to AddProduct 🚀
                    onCancel={handleCancel} 
                />
            ) : showPage === "edit" && editingProduct ? (
                // Render EditProduct when editingProduct is set
                <EditProduct 
                    product={editingProduct}
                    onSave={handleEditProduct} 
                    // 🚀 Passed handleCancel to EditProduct 🚀
                    onCancel={handleCancel}
                />
            ) : (
                // Render AdminDashboard
                <AdminDashboard 
                    products={products} 
                    onDeleteProduct={handleDeleteProduct}
                    onEditProduct={startEdit} 
                /> 
            )}
        </div>
    );
}

export default App;