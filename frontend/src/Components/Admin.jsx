import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    weight: "",
    flavours: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories");
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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please select an image.");
      return;
    }
    if (!formData.name || !formData.price || !formData.flavours || !formData.description) {
      alert("Please fill in all required fields.");
      return;
    }

    const token = localStorage.getItem("token");
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", parseFloat(formData.price));
    if (formData.weight) {
      formDataToSend.append("weight", parseFloat(formData.weight));
    }
    formDataToSend.append("flavours", formData.flavours);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("categoryId", selectedCategory._id);
    formDataToSend.append("image", formData.image);

    try {
      const response = await fetch("http://localhost:5000/api/admin/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();
      if (data.success) {
        setShowForm(false);
        setSelectedCategory(null);
        alert("Product added successfully!");
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product.");
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedCategory(null);
  };

  if (!selectedCategory) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
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

                    {/* Add Details Button */}
                    <div className="mt-6">
                      <button
                        onClick={() => handleAddDetails(category)}
                        className="w-full inline-block text-center px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
                      >
                        Add Details
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
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
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

                  {/* Add Details Button */}
                  <div className="mt-6">
                    <button
                      onClick={() => handleAddDetails(category)}
                      className="w-full inline-block text-center px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
                    >
                      Add Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Add Product Details for {selectedCategory.name}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  required
                />
              </div>

              {selectedCategory.name !== "Desserts" &&
                selectedCategory.name !== "Cup Cakes" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Weight (g)
                    </label>
                    <input
                      type="number"
                      className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                      value={formData.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                    />
                  </div>
                )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Flavours
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  value={formData.flavours}
                  onChange={(e) => handleInputChange("flavours", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  rows="3"
                  className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Image (PNG, JPG, JPEG)
                </label>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className="w-full mt-1"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;