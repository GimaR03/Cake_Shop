import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_ENDPOINTS, API_URL } from '../config/api';
import { getImageUrl, handleImageError } from '../utils/imageUtils';

const ViewCategoryAdmin = () => {
  const { categoryId } = useParams(); // Get categoryId from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCTS_BY_CATEGORY(categoryId));
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        setError('No products found');
      }
    } catch (err) {
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Products in This Category
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-300">
              View and manage products
            </p>
            <Link
              to="/admin" // Back to admin dashboard
              className="mt-4 inline-block px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Back to Categories
            </Link>
          </div>

          {products.length === 0 ? (
            <p className="text-center text-gray-500">No products yet. Add some!</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <div key={product._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      handleImageError(e, 0);
                    }}
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{product.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">{product.description}</p>
                    <p className="text-pink-600 font-bold mt-2">Price: Rs. {product.price}</p>
                    {product.weight && <p className="text-gray-600">Weight: {product.weight}g</p>}
                    <p className="text-gray-600">Flavours: {product.flavours}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCategoryAdmin;