import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    basePrice: '',
    sizes: [{ size: '', price: '' }]
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchCategories();
  }, [navigate]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/categories', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingCategory 
        ? `http://localhost:5000/api/admin/categories/${editingCategory._id}`
        : 'http://localhost:5000/api/admin/categories';
      
      const method = editingCategory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          basePrice: parseFloat(formData.basePrice),
          sizes: formData.sizes.map(size => ({
            size: size.size,
            price: parseFloat(size.price)
          }))
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setShowForm(false);
        setEditingCategory(null);
        setFormData({
          name: '',
          description: '',
          image: '',
          basePrice: '',
          sizes: [{ size: '', price: '' }]
        });
        fetchCategories();
      }
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image,
      basePrice: category.basePrice.toString(),
      sizes: category.sizes.length > 0 ? category.sizes : [{ size: '', price: '' }]
    });
    setShowForm(true);
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/admin/categories/${categoryId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (data.success) {
          fetchCategories();
        }
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const addSizeField = () => {
    setFormData({
      ...formData,
      sizes: [...formData.sizes, { size: '', price: '' }]
    });
  };

  const removeSizeField = (index) => {
    const newSizes = formData.sizes.filter((_, i) => i !== index);
    setFormData({ ...formData, sizes: newSizes });
  };

  const updateSizeField = (index, field, value) => {
    const newSizes = formData.sizes.map((size, i) => 
      i === index ? { ...size, [field]: value } : size
    );
    setFormData({ ...formData, sizes: newSizes });
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
          >
            Add New Category
          </button>
        </div>

        {/* Category Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Base Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Sizes & Prices
                  </label>
                  {formData.sizes.map((size, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <input
                        type="text"
                        placeholder="Size (e.g., Small, 1kg)"
                        value={size.size}
                        onChange={(e) => updateSizeField(index, 'size', e.target.value)}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        value={size.price}
                        onChange={(e) => updateSizeField(index, 'price', e.target.value)}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                      {formData.sizes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSizeField(index)}
                          className="bg-red-600 text-white px-3 rounded-md hover:bg-red-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSizeField}
                    className="mt-2 bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700"
                  >
                    Add Size
                  </button>
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingCategory(null);
                      setFormData({
                        name: '',
                        description: '',
                        image: '',
                        basePrice: '',
                        sizes: [{ size: '', price: '' }]
                      });
                    }}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
                  >
                    {editingCategory ? 'Update' : 'Add'} Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Categories List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                }}
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{category.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{category.description}</p>
                <p className="text-lg font-bold text-pink-600 dark:text-pink-400 mt-2">
                  From ${category.basePrice}
                </p>
                {category.sizes && category.sizes.length > 0 && (
                  <div className="mt-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Sizes:</h4>
                    {category.sizes.map((size, index) => (
                      <div key={index} className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                        <span>{size.size}</span>
                        <span>${size.price}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;