import React, { useState } from "react"; 
import "./AdminDashboard.css";

// Export categories so AddProduct.js and App.js can import them
export const categories = {
    1: "Drinks",
    2: "Dairy",
    3: "Snacks",
    4: "Bakery",
};

// AdminDashboard now accepts both delete and edit handler functions
function AdminDashboard({ products, onDeleteProduct, onEditProduct }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    
    // Helper function to calculate the discounted price
    const calculateSellingPrice = (price, discount) => {
        const disc = discount || 0;
        const finalPrice = price * (1 - disc / 100);
        return finalPrice;
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleFilter = (e) => {
        setFilterCategory(e.target.value);
    };

    const filteredProducts = products.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm);
        
        // Helper to get the category name for filtering, regardless of ID or name being present
        const getCategoryName = (product) => {
            return product.category 
                ? product.category 
                : categories[product.categoryId] || ''; 
        }

        const matchesCategory =
             filterCategory === "" || getCategoryName(p) === filterCategory;
        
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard ({filteredProducts.length} Items)</h1>

            <div className="filter-section">
                <input
                    type="text"
                    placeholder="Search product..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                
                <select onChange={handleFilter} value={filterCategory}>
                    <option value="">All Categories</option>
                    {Object.values(categories).map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>

            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Original Price (₱)</th>
                        <th>Discount (%)</th>
                        <th>Selling Price (₱)</th> 
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>
                                <img src={p.imageUrl} alt={p.name} className="product-img" />
                            </td>
                            <td>{p.name}</td>
                            
                            {/* Display category name using the stored string or mapping the ID */}
                            <td>
                                {p.category || categories[p.categoryId] || 'N/A'}
                            </td> 

                            {/* Original Price */}
                            <td>{p.price.toFixed(2)}</td> 
                            
                            {/* Discount */}
                            <td>{p.discount || 0}</td> 

                            {/* Calculated Selling Price */}
                            <td>
                                {calculateSellingPrice(p.price, p.discount).toFixed(2)}
                            </td>
                            
                            <td>{p.description}</td>
                            
                            {/* Stacked Action buttons */}
                            <td style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                                <button 
                                    className="edit-btn" 
                                    style={{ width: '80px' }}
                                    // Wires up the Edit action
                                    onClick={() => onEditProduct(p.id)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="delete-btn" 
                                    onClick={() => onDeleteProduct(p.id)}
                                    style={{ 
                                        width: '80px', 
                                        backgroundColor: '#dc3545', 
                                        color: 'white', 
                                        border: 'none', 
                                        padding: '5px 10px', 
                                        cursor: 'pointer', 
                                        borderRadius: '4px' 
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;