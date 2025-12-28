import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaEye, FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { API_ENDPOINTS, API_URL } from "../config/api";

const Admin = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    weight: "",
    flavours: "",
    description: "",
    image: null,
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
    price: "",
    weight: "",
    flavours: "",
    description: "",
    image: null,
  });
  const [adminNickname, setAdminNickname] = useState('');

  useEffect(() => {
    // Get admin nickname from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setAdminNickname(user.nickname || 'Shabee');
      } catch (error) {
        console.error('Error parsing user data:', error);
        setAdminNickname('Shabee');
      }
    } else {
      setAdminNickname('Shabee');
    }
    
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.CATEGORIES);
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories);
      } else {
        setFallbackCategories();
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setFallbackCategories();
    }
  };

  const setFallbackCategories = () => {
    setCategories([
      {
        _id: 1,
        name: "Bento Cakes",
        image: "/images/bentocake.webp",
      },
      {
        _id: 2,
        name: "Cakes",
        image: "/images/cakes.webp",
      },
      {
        _id: 3,
        name: "Celebration Cakes",
        image: "/images/CelebrationCake.jpg",
      },
      {
        _id: 4,
        name: "Desserts",
        image: "/images/Desserts.png",
      },
      {
        _id: 5,
        name: "Cup Cakes",
        image: "/images/Cupcakes.webp",
      },
    ]);
  };

  const handleAddDetails = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: "",
      price: "",
      weight: "",
      flavours: "",
      description: "",
      image: null,
    });
    setShowForm(true);
  };

  const handleViewDetails = async (category) => {
    setSelectedCategory(category);
    setLoadingProducts(true);
    setShowViewDetails(true);
    await fetchProductsForCategory(category.name);
  };

  const fetchProductsForCategory = async (categoryName) => {
    setLoadingProducts(true);
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCTS_BY_CATEGORY(categoryName));
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.products || []);
      } else {
        setProducts([]);
        console.error("Error fetching products:", data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setEditFormData({
      name: product.name || "",
      price: product.price || "",
      weight: product.weight || "",
      flavours: product.flavours || "",
      description: product.description || "",
      image: null, // Don't pre-fill image, user can upload new one
    });
    setShowEditForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCT_BY_ID(productId), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        alert("Product deleted successfully!");
        // Refresh products list
        await fetchProductsForCategory(selectedCategory.name);
      } else {
        alert(data.message || "Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product. Please try again.");
    }
  };

  const handleEditInputChange = (field, value) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditFileChange = (e) => {
    setEditFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formDataToSend = new FormData();
    
    if (editFormData.name) formDataToSend.append("name", editFormData.name);
    if (editFormData.price) formDataToSend.append("price", parseFloat(editFormData.price));
    if (editFormData.weight) formDataToSend.append("weight", parseFloat(editFormData.weight));
    if (editFormData.flavours) formDataToSend.append("flavours", editFormData.flavours);
    if (editFormData.description) formDataToSend.append("description", editFormData.description);
    if (editFormData.image) formDataToSend.append("image", editFormData.image);

    try {
      const response = await fetch(API_ENDPOINTS.PRODUCT_BY_ID(selectedProduct._id), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setShowEditForm(false);
        setSelectedProduct(null);
        setEditFormData({
          name: "",
          price: "",
          weight: "",
          flavours: "",
          description: "",
          image: null,
        });
        alert("Product updated successfully!");
        // Refresh products list
        await fetchProductsForCategory(selectedCategory.name);
      } else {
        alert(data.message || "Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert(`Error: ${error.message || "Failed to update product. Please try again."}`);
    }
  };

  const closeEditForm = () => {
    setShowEditForm(false);
    setSelectedProduct(null);
    setEditFormData({
      name: "",
      price: "",
      weight: "",
      flavours: "",
      description: "",
      image: null,
    });
    // Return to view details (don't close view details)
    // The view details will show again since showEditForm is now false
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // All fields are optional, but at least one should be provided
    if (!formData.name && !formData.price && !formData.flavours && !formData.description && !formData.image) {
      alert("Please fill in at least one field.");
      return;
    }

    const token = localStorage.getItem("token");
    const formDataToSend = new FormData();
    
    if (formData.name) formDataToSend.append("name", formData.name);
    if (formData.price) formDataToSend.append("price", parseFloat(formData.price));
    if (formData.weight) formDataToSend.append("weight", parseFloat(formData.weight));
    if (formData.flavours) formDataToSend.append("flavours", formData.flavours);
    if (formData.description) formDataToSend.append("description", formData.description);
    if (formData.image) formDataToSend.append("image", formData.image);
    
    formDataToSend.append("categoryName", selectedCategory.name);
    formDataToSend.append("categoryId", selectedCategory._id);

    try {
      const response = await fetch(API_ENDPOINTS.PRODUCTS, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setShowForm(false);
        setSelectedCategory(null);
        setFormData({
          name: "",
          price: "",
          weight: "",
          flavours: "",
          description: "",
          image: null,
        });
        alert("Product added successfully!");
      } else {
        alert(data.message || "Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      console.error("Error details:", error.message);
      alert(`Error: ${error.message || "Failed to add product. Please check backend server and try again."}`);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedCategory(null);
    setFormData({
      name: "",
      price: "",
      weight: "",
      flavours: "",
      description: "",
      image: null,
    });
  };

  const closeViewDetails = () => {
    setShowViewDetails(false);
    setSelectedCategory(null);
    setProducts([]);
  };

  // Show Edit Form Modal
  if (showEditForm && selectedProduct && selectedCategory) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Hi {adminNickname}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Edit Product - {selectedCategory.name}
            </p>
          </div>
        </div>

        {/* Edit Product Form */}
        <div className="py-12 bg-white dark:bg-gray-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <form onSubmit={handleUpdateProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    value={editFormData.name}
                    onChange={(e) => handleEditInputChange("name", e.target.value)}
                    placeholder="Enter product name (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Price (Rs)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    value={editFormData.price}
                    onChange={(e) => handleEditInputChange("price", e.target.value)}
                    placeholder="Enter price (optional)"
                  />
                </div>

                {selectedCategory.name !== "Desserts" &&
                  selectedCategory.name !== "Cup Cakes" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Weight (g)
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        value={editFormData.weight}
                        onChange={(e) => handleEditInputChange("weight", e.target.value)}
                        placeholder="Enter weight in grams (optional)"
                      />
                    </div>
                  )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Flavours
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    value={editFormData.flavours}
                    onChange={(e) => handleEditInputChange("flavours", e.target.value)}
                    placeholder="Enter flavours (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    rows="4"
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    value={editFormData.description}
                    onChange={(e) => handleEditInputChange("description", e.target.value)}
                    placeholder="Enter description (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Image (PNG, JPG, JPEG)
                  </label>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    onChange={handleEditFileChange}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Optional - Upload new image to replace current one
                  </p>
                  {selectedProduct.image && !editFormData.image && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Current image will be kept if no new image is uploaded
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={closeEditForm}
                    className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show View Details Modal
  if (showViewDetails && selectedCategory) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  Hi {adminNickname}
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  View Details - {selectedCategory.name}
                </p>
              </div>
              <button
                onClick={closeViewDetails}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 font-medium transition-colors shadow-md"
              >
                <FaArrowLeft /> Back to Category
              </button>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="py-12 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loadingProducts ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-300">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  No products found for {selectedCategory.name}
                </p>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Click "Add Details" to add products to this category
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Products in {selectedCategory.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Total: {products.length} product(s)
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
                    >
                      {product.image && (
                        <div className="mb-4">
                          <img
                            src={`${API_URL}${product.image}`}
                            alt={product.name || "Product"}
                            className="w-full h-48 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                            }}
                          />
                        </div>
                      )}
                      <div className="space-y-2">
                        {product.name && (
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {product.name}
                          </h3>
                        )}
                        {product.price && (
                          <p className="text-lg text-pink-600 dark:text-pink-400 font-semibold">
                            Rs. {product.price.toFixed(2)}
                          </p>
                        )}
                        {product.weight && (
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Weight: {product.weight}g
                          </p>
                        )}
                        {product.flavours && (
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Flavours:</span> {product.flavours}
                          </p>
                        )}
                        {product.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {product.description}
                          </p>
                        )}
                      </div>
                      
                      {/* Edit and Delete Buttons */}
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center gap-2 transition-colors"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show Add Form
  if (showForm && selectedCategory) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Hi {adminNickname}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Add Product Details for {selectedCategory.name}
            </p>
          </div>
        </div>

        {/* Add Product Form */}
        <div className="py-12 bg-white dark:bg-gray-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter product name (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Price (Rs)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="Enter price (optional)"
                  />
                </div>

                {selectedCategory.name !== "Desserts" &&
                  selectedCategory.name !== "Cup Cakes" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Weight (g)
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        value={formData.weight}
                        onChange={(e) => handleInputChange("weight", e.target.value)}
                        placeholder="Enter weight in grams (optional)"
                      />
                    </div>
                  )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Flavours
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    value={formData.flavours}
                    onChange={(e) => handleInputChange("flavours", e.target.value)}
                    placeholder="Enter flavours (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    rows="4"
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Enter description (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Image (PNG, JPG, JPEG)
                  </label>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    onChange={handleFileChange}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Optional - Upload product image
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show Categories List
  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Hi {adminNickname}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Welcome to Admin Dashboard
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Our Cake Categories
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-300">
              Explore our delicious range of cakes for every occasion
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div key={category._id} className="flex flex-col">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex flex-col h-full">
                  <div className="relative h-64">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x300?text=Image+Not+Found";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-lg" />
                    <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white text-center">
                      {category.name}
                    </h3>
                  </div>

                  {/* Buttons */}
                  <div className="mt-6 space-y-2">
                    <button
                      onClick={() => handleAddDetails(category)}
                      className="w-full inline-block text-center px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
                    >
                      Add Details
                    </button>
                    <button
                      onClick={() => handleViewDetails(category)}
                      className="w-full inline-block text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                      <FaEye /> View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
