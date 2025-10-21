import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import AdminDashboard, { categories } from "./pages/AdminDashboard";
import EditProduct from "./pages/EditProduct";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import productsData from "./data/products.json";
import { CartProvider } from "./context/CartContext";
import "./App.css";
import OrderStatus from "./pages/OrderStatus";

const formatProducts = (products) => {
  return products.map(p => ({
    ...p,
    price: parseFloat(p.price) || 0,
    stock: parseFloat(p.stock) || 0,
    discount: parseFloat(p.discount) || 0,
    category: p.category
      ? String(p.category)
      : (p.categoryId && categories[p.categoryId])
        ? categories[p.categoryId]
        : 'Uncategorized',
  }));
};

const categoriesArray = [
  { id: 1, name: "Beverage", imageUrl: "/img/categories/drinks.png" },
  { id: 2, name: "Dairy", imageUrl: "/img/categories/dairy.png" },
  { id: 3, name: "Snacks", imageUrl: "/img/categories/snacks.png" },
  { id: 4, name: "Pastries", imageUrl: "/img/categories/bakery.png" }
];

function App() {
  const [products, setProducts] = useState([]);
  const [showPage, setShowPage] = useState("dashboard");
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const loadProducts = () => {
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
    };

    loadProducts();

    const handleStorageChange = () => {
      loadProducts();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
  };

  const getNextId = () => {
    if (products.length === 0) {
      return 1;
    }
    const maxId = products.reduce((max, p) => {
      const currentId = parseInt(p.id);
      return currentId > max ? currentId : max;
    }, 0);
    return maxId + 1;
  };

  const updateLocalStorage = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    window.dispatchEvent(new Event('productsUpdated'));
  };

  const handleAddProduct = (newProduct) => {
    const newId = getNextId();
    const categoryId = Object.keys(categories).find(
      key => categories[key] === newProduct.category
    );
    const productWithId = {
      id: newId,
      ...newProduct,
      categoryId: parseInt(categoryId) || null
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

  const startEdit = (id) => {
    const productToEdit = products.find(p => p.id === id);
    setEditingProduct(productToEdit);
    setShowPage("edit");
  };

  const handleEditProduct = (editedProduct) => {
    const categoryId = Object.keys(categories).find(
      key => categories[key] === editedProduct.category
    );
    const productWithCategoryId = {
      ...editedProduct,
      categoryId: parseInt(categoryId) || editedProduct.categoryId
    };
    const updatedProducts = products.map(p =>
      p.id === editedProduct.id ? productWithCategoryId : p
    );
    updateLocalStorage(updatedProducts);
    setEditingProduct(null);
    setShowPage("dashboard");
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setShowPage("dashboard");
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const filteredProducts = selectedCategory
    ? products.filter(p => p.categoryId === selectedCategory)
    : products;

  const AdminRoutes = () => (
    <div>
      {showPage === "add" ? (
        <AddProduct
          onAddProduct={handleAddProduct}
          onCancel={handleCancel}
        />
      ) : showPage === "edit" && editingProduct ? (
        <EditProduct
          product={editingProduct}
          onSave={handleEditProduct}
          onCancel={handleCancel}
        />
      ) : (
        <AdminDashboard
          products={products}
          onDeleteProduct={handleDeleteProduct}
          onEditProduct={startEdit}
          onAddProductClick={() => setShowPage("add")}
          showPage={showPage}
          setShowPage={setShowPage}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );

  return (
    <CartProvider>
      <Router>
        <ConditionalNavbar />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                categories={categoriesArray}
                products={products}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/products"
            element={
              <ProductList
                products={filteredProducts}
                categories={categoriesArray}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
                currentPage={currentPage}
                productsPerPage={productsPerPage}
                setCurrentPage={setCurrentPage}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/product/:productId"
            element={<ProductDetails products={products} />}
          />
          <Route
            path="/cart"
            element={<Cart />}
          />
          <Route
            path="/checkout"
            element={<Checkout />}
          />
          <Route
            path="/admin"
            element={<AdminRoutes />}
          />
          <Route
            path="/order-status"
            element={<OrderStatus />}
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

const ConditionalNavbar = () => {
  return <Navbar />;
};

export default App;
