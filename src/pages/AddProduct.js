import React from "react";

const AddProduct = () => {
  return (
    <div className="min-h-screen bg-green-100 font-sans">
      {/* Navbar */}
      <header className="bg-green-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
          <div className="flex items-center space-x-2">
            <div className="text-green-800 font-extrabold text-xl">JAKE STORE</div>
          </div>
          <nav className="flex items-center space-x-8 text-green-800 font-semibold">
            <a href="#" className="hover:text-green-600">Categories</a>
            <a href="#" className="hover:text-green-600">Products</a>

            <div className="flex items-center bg-white rounded-full px-3 py-1 shadow-inner">
              <span className="text-green-600 mr-1">🔍</span>
              <input
                type="text"
                placeholder="Search..."
                className="outline-none text-sm bg-transparent w-28"
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-green-800">👤</span>
              <span>Admin</span>
            </div>

            <span className="text-green-700 text-lg">🛒</span>
          </nav>
        </div>
      </header>

      {/* Add Product Form */}
      <div className="flex justify-center mt-10">
        <div className="bg-white shadow-md rounded-3xl p-10 w-[75%] max-w-4xl">
          <h2 className="text-green-800 font-bold text-lg mb-6">Add Products</h2>

          <form className="grid grid-cols-2 gap-x-8 gap-y-4">
            {/* Left column */}
            <div>
              <label className="block text-green-800 font-medium mb-1">Product Name</label>
              <input
                type="text"
                className="w-full border border-green-200 rounded-md p-2 focus:ring-2 focus:ring-green-300"
              />

              <label className="block text-green-800 font-medium mt-3 mb-1">Description</label>
              <input
                type="text"
                className="w-full border border-green-200 rounded-md p-2 focus:ring-2 focus:ring-green-300"
              />

              <label className="block text-green-800 font-medium mt-3 mb-1">Category</label>
              <input
                type="text"
                className="w-full border border-green-200 rounded-md p-2 focus:ring-2 focus:ring-green-300"
              />

              <label className="block text-green-800 font-medium mt-3 mb-1">Image URL</label>
              <input
                type="text"
                className="w-full border border-green-200 rounded-md p-2 focus:ring-2 focus:ring-green-300"
              />
            </div>

            {/* Right column */}
            <div>
              <label className="block text-green-800 font-medium mb-1">Stock</label>
              <input
                type="number"
                className="w-full border border-green-200 rounded-md p-2 focus:ring-2 focus:ring-green-300"
              />

              <label className="block text-green-800 font-medium mt-3 mb-1">Price (₱)</label>
              <input
                type="number"
                className="w-full border border-green-200 rounded-md p-2 focus:ring-2 focus:ring-green-300"
              />

              <label className="block text-green-800 font-medium mt-3 mb-1">Discount (%)</label>
              <input
                type="number"
                className="w-full border border-green-200 rounded-md p-2 focus:ring-2 focus:ring-green-300"
              />
            </div>
          </form>

          {/* Buttons */}
          <div className="flex justify-center mt-8 space-x-6">
            <button
              type="button"
              className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800"
            >
              Create Product
            </button>
            <button
              type="button"
              className="bg-green-300 text-white px-5 py-2 rounded-lg hover:bg-green-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
