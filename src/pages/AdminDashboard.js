
import React, { useState } from "react"; 
import "../Styles/AdminDashboard.css";
import Pagination from '../components/Pagination';

// Export categories
export const categories = {
    1: "Beverage",
    2: "Dairy",
    3: "Snacks",
    4: "Pastries",
};

function AdminDashboard({ 
    products, 
    onDeleteProduct, 
    onEditProduct, 
    onAddProductClick,
    showPage,
    setShowPage,
    handleCancel 
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10; // Show 10 products per page
    
    // Calculate the discounted/selling price
    const calculateSellingPrice = (price, discount) => {
        const disc = discount || 0;
        return price * (1 - disc / 100);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleFilter = (categoryName) => {
        setFilterCategory(filterCategory === categoryName ? "" : categoryName);
        setCurrentPage(1); // Reset to first page when filtering
    };

    // Filter products
    const filteredProducts = products.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm);
        
        const getCategoryName = (product) => {
            return product.category 
                ? product.category 
                : categories[product.categoryId] || ''; 
        };

        const matchesCategory =
             filterCategory === "" || getCategoryName(p) === filterCategory;
        
        return matchesSearch && matchesCategory;
    });

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="admin-dashboard">
            {/* Header with Title and Navigation Buttons */}
            <div className="dashboard-header">
                <h1>Admin dashboard</h1>
                <div className="dashboard-nav-buttons">
                    <button
                        onClick={handleCancel}
                        className={`dashboard-nav-btn ${showPage === "dashboard" ? "active" : ""}`}
                    >
                        📊 Dashboard
                    </button>
                    <button
                        onClick={() => setShowPage("add")}
                        className={`dashboard-nav-btn ${showPage === "add" ? "active" : ""}`}
                    >
                        ➕ Add Product
                    </button>
                </div>
            </div>
            
            {/* Filter by Category and Search Bar Row */}
            <div className="filter-search-row">
                {/* Left side: Filter by Category */}
                <div className="filter-section">
                    <div className="filter-label">Filter by Category</div>
                    <div className="category-pills">
                        <button
                            className={`category-pill ${filterCategory === "" ? "active" : ""}`}
                            onClick={() => setFilterCategory("")}
                        >
                            All Categories
                        </button>
                        {Object.values(categories).map((name) => (
                            <button
                                key={name}
                                className={`category-pill ${filterCategory === name ? "active" : ""}`}
                                onClick={() => handleFilter(name)}
                            >
                                {name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right side: Search Bar */}
                <div className="search-container">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input"
                    />
                </div>
            </div>

            {/* Products Table */}
            <div className="table-wrapper">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Discount</th>
                            <th>Selling Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="empty-message">
                                    No products found
                                </td>
                            </tr>
                        ) : (
                            currentProducts.map((p) => (
                                <tr key={p.id}>
                                    <td>
                                        <img 
                                            src={p.imageUrl || '/img/placeholder.png'} 
                                            alt={p.name} 
                                            className="product-img" 
                                        />
                                    </td>
                                    <td>{p.name}</td>
                                    <td>{p.category || categories[p.categoryId] || 'N/A'}</td>
                                    <td>₱{p.price.toFixed(2)}</td>
                                    <td>{p.stock || 0}</td>
                                    <td>{p.discount || 0}%</td>
                                    <td>₱{calculateSellingPrice(p.price, p.discount).toFixed(2)}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button 
                                                className="action-btn edit-icon"
                                                onClick={() => onEditProduct(p.id)}
                                                title="Edit"
                                            >
                                                ✏️
                                            </button>
                                            <button 
                                                className="action-btn delete-icon"
                                                onClick={() => onDeleteProduct(p.id)}
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Component */}
            <Pagination 
                itemsPerPage={productsPerPage}
                totalItems={filteredProducts.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
}

export default AdminDashboard;