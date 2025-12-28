import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart, FaTimes, FaMapMarkerAlt, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { API_ENDPOINTS, API_URL } from '../config/api';

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState({});
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const contactInfo = {
    address: "No.220/1, Phalakondadeniya, Katugastota",
    googleMapsLink: "https://maps.app.goo.gl/ftzLdXAMijhFaSVc8",
    phones: ["0761530112", "0768304426"],
    whatsapp: "0761530112",
  };

  const handleOrderNow = (product) => {
    setSelectedProduct(product);
    setShowOrderModal(true);
  };

  const handlePhoneClick = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsAppClick = () => {
    if (!selectedProduct) return;
    
    let message = `Hi! I'm interested in ordering:\n\n`;
    message += `🍰 ${selectedProduct.name || 'Product'}\n`;
    if (selectedProduct.price) {
      message += `💰 Price: Rs. ${selectedProduct.price.toFixed(2)}\n`;
    }
    if (selectedProduct.weight) {
      message += `⚖️ Weight: ${selectedProduct.weight}g\n`;
    }
    if (selectedProduct.flavours) {
      message += `🍓 Flavours: ${selectedProduct.flavours}\n`;
    }
    if (selectedProduct.description) {
      message += `📝 Description: ${selectedProduct.description}\n`;
    }
    message += `\nPlease let me know about availability and delivery options. Thank you!`;
    
    const whatsappUrl = `https://wa.me/94${contactInfo.whatsapp.replace(/^0/, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleGoogleMapsClick = () => {
    window.open(contactInfo.googleMapsLink, '_blank');
  };

  // Map category IDs/names to display names
  const categoryMap = {
    '1': 'Bento Cakes',
    '2': 'Cakes',
    '3': 'Celebration Cakes',
    '4': 'Desserts',
    '5': 'Cup Cakes',
    'bento-cakes': 'Bento Cakes',
    'cakes': 'Cakes',
    'celebration-cakes': 'Celebration Cakes',
    'desserts': 'Desserts',
    'cupcakes': 'Cup Cakes',
    'cup-cakes': 'Cup Cakes',
  };

  const categoryImages = {
    'Bento Cakes': '/images/bentocake.webp',
    'Cakes': '/images/cakes.webp',
    'Celebration Cakes': '/images/CelebrationCake.jpg',
    'Desserts': '/images/Desserts.png',
    'Cup Cakes': '/images/Cupcakes.webp',
  };

  useEffect(() => {
    // Get the actual category name from the URL parameter
    const actualCategoryName = categoryMap[categoryName] || categoryName || 'Bento Cakes';
    setCategoryInfo({
      name: actualCategoryName,
      image: categoryImages[actualCategoryName] || '/images/bentocake.webp'
    });

    fetchProducts(actualCategoryName);
  }, [categoryName]);

  const fetchProducts = async (categoryName) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-pink-600 hover:text-pink-700 dark:text-pink-400 mb-4"
          >
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
          
          {categoryInfo && (
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative w-full md:w-64 h-48 rounded-lg overflow-hidden">
                <img
                  src={categoryInfo.image}
                  alt={categoryInfo.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300?text=Category";
                  }}
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                  {categoryInfo.name}
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Explore our delicious {categoryInfo.name.toLowerCase()} collection
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products Section */}
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300 text-lg">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🍰</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  No products available yet
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We're working on adding amazing {categoryInfo?.name.toLowerCase()} to this category. Check back soon!
                </p>
                <Link
                  to="/"
                  className="inline-block px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Available Products
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {products.length} product{products.length !== 1 ? 's' : ''} found
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
                  >
                    {product.image && (
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={`${API_URL}${product.image}`}
                          alt={product.name || "Product"}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                          }}
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="space-y-3">
                        {product.name && (
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {product.name}
                          </h3>
                        )}
                        {product.price && (
                          <p className="text-2xl text-pink-600 dark:text-pink-400 font-semibold">
                            Rs. {product.price.toFixed(2)}
                          </p>
                        )}
                        {product.weight && (
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Weight:</span> {product.weight}g
                          </p>
                        )}
                        {product.flavours && (
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Flavours:
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {product.flavours}
                            </p>
                          </div>
                        )}
                        {product.description && (
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Description:
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                              {product.description}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                        <button
                          onClick={() => {
                            addToCart(product);
                            setAddedToCart(prev => ({ ...prev, [product._id]: true }));
                            setTimeout(() => {
                              setAddedToCart(prev => ({ ...prev, [product._id]: false }));
                            }, 2000);
                          }}
                          className={`w-full px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2 ${
                            addedToCart[product._id]
                              ? 'bg-green-600 text-white'
                              : 'bg-pink-600 text-white hover:bg-pink-700'
                          }`}
                        >
                          <FaShoppingCart />
                          {addedToCart[product._id] ? 'Added to Cart!' : 'Add to Cart'}
                        </button>
                        <button
                          onClick={() => handleOrderNow(product)}
                          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
                        >
                          Order Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Order Now Modal */}
      {showOrderModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Order Details</h2>
              <button
                onClick={() => {
                  setShowOrderModal(false);
                  setSelectedProduct(null);
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Product Details */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Cake Details</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                  {selectedProduct.image && (
                    <div className="w-full h-64 rounded-lg overflow-hidden">
                      <img
                        src={`http://localhost:5000${selectedProduct.image}`}
                        alt={selectedProduct.name || "Product"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                        }}
                      />
                    </div>
                  )}
                  {selectedProduct.name && (
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Name: </span>
                      <span className="text-gray-900 dark:text-white">{selectedProduct.name}</span>
                    </div>
                  )}
                  {selectedProduct.price && (
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Price: </span>
                      <span className="text-pink-600 dark:text-pink-400 font-bold text-lg">
                        Rs. {selectedProduct.price.toFixed(2)}
                      </span>
                    </div>
                  )}
                  {selectedProduct.weight && (
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Weight: </span>
                      <span className="text-gray-900 dark:text-white">{selectedProduct.weight}g</span>
                    </div>
                  )}
                  {selectedProduct.flavours && (
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Flavours: </span>
                      <span className="text-gray-900 dark:text-white">{selectedProduct.flavours}</span>
                    </div>
                  )}
                  {selectedProduct.description && (
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Description: </span>
                      <p className="text-gray-900 dark:text-white mt-1">{selectedProduct.description}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Our Location</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="h-5 w-5 text-pink-600 dark:text-pink-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-white font-medium mb-2">
                        {contactInfo.address}
                      </p>
                      <button
                        onClick={handleGoogleMapsClick}
                        className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-medium flex items-center gap-1"
                      >
                        <span>View on Google Maps</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>

                  {/* Phone Numbers */}
                  <div className="flex items-start gap-3">
                    <FaPhone className="h-5 w-5 text-pink-600 dark:text-pink-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Call Us</h4>
                      <div className="space-y-1">
                        {contactInfo.phones.map((phone, index) => (
                          <button
                            key={index}
                            onClick={() => handlePhoneClick(phone)}
                            className="block text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                          >
                            {phone}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-3">
                    <FaWhatsapp className="h-5 w-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">WhatsApp Message</h4>
                      <button
                        onClick={handleWhatsAppClick}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold flex items-center gap-2 transition-colors"
                      >
                        <FaWhatsapp className="h-5 w-5" />
                        <span>{contactInfo.whatsapp}</span>
                        <span>(Click to chat)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 p-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowOrderModal(false);
                  setSelectedProduct(null);
                }}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;

