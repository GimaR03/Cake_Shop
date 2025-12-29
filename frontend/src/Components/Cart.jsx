import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash, FaPlus, FaMinus, FaShoppingCart, FaArrowLeft, FaTimes, FaMapMarkerAlt, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { API_URL } from '../config/api';
import { getImageUrl, handleImageError } from '../utils/imageUtils';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const [nickname, setNickname] = useState('');
  const [showOrderModal, setShowOrderModal] = useState(false);

  const contactInfo = {
    address: "No.220/1, Phalakondadeniya, Katugastota",
    googleMapsLink: "https://maps.app.goo.gl/ftzLdXAMijhFaSVc8",
    phones: ["0761530112", "0768304426"],
    whatsapp: "0761530112",
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setNickname(user.nickname || '');
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleOrderNow = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setShowOrderModal(true);
  };

  const handlePhoneClick = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsAppClick = () => {
    let message = `Hi! I'm interested in ordering the following items from my cart:\n\n`;
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name || 'Product'}\n`;
      if (item.price) {
        message += `   Price: Rs. ${item.price.toFixed(2)}`;
        if (item.quantity > 1) {
          message += ` x ${item.quantity} = Rs. ${(item.price * item.quantity).toFixed(2)}`;
        }
        message += `\n`;
      }
      if (item.weight) {
        message += `   Weight: ${item.weight}g\n`;
      }
      if (item.flavours) {
        message += `   Flavours: ${item.flavours}\n`;
      }
      message += `\n`;
    });
    
    message += `Total: Rs. ${getCartTotal().toFixed(2)}\n\n`;
    message += `Please let me know about availability and delivery options. Thank you!`;
    
    const whatsappUrl = `https://wa.me/94${contactInfo.whatsapp.replace(/^0/, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleGoogleMapsClick = () => {
    window.open(contactInfo.googleMapsLink, '_blank');
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-pink-600 hover:text-pink-700 dark:text-pink-400 mb-4"
          >
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            {nickname ? `Hi ${nickname}, ` : ''}Your Shopping Cart
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Review your items before checkout
          </p>
        </div>
      </div>

      {/* Cart Content */}
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <FaShoppingCart className="text-6xl text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Start adding delicious cakes to your cart!
              </p>
              <Link
                to="/"
                className="inline-block px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Cart Items ({cartItems.length})
                    </h2>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to clear your cart?')) {
                          clearCart();
                        }
                      }}
                      className="text-red-600 hover:text-red-700 dark:text-red-400 text-sm font-medium"
                    >
                      Clear Cart
                    </button>
                  </div>

                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        {item.image && (
                          <div className="w-full sm:w-32 h-32 flex-shrink-0">
                            <img
                              src={getImageUrl(item.image)}
                              alt={item.name || 'Product'}
                              className="w-full h-full object-cover rounded-lg"
                              onError={(e) => {
                                handleImageError(e, 0);
                              }}
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              {item.name && (
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                  {item.name}
                                </h3>
                              )}
                              {item.categoryName && (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Category: {item.categoryName}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => removeFromCart(item._id)}
                              className="text-red-600 hover:text-red-700 dark:text-red-400 p-1"
                              title="Remove from cart"
                            >
                              <FaTrash />
                            </button>
                          </div>

                          {item.flavours && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                              <span className="font-medium">Flavours:</span> {item.flavours}
                            </p>
                          )}

                          {item.weight && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                              <span className="font-medium">Weight:</span> {item.weight}g
                            </p>
                          )}

                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Quantity:
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleQuantityChange(item._id, (item.quantity || 1) - 1)}
                                  className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
                                >
                                  <FaMinus className="text-xs" />
                                </button>
                                <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">
                                  {item.quantity || 1}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(item._id, (item.quantity || 1) + 1)}
                                  className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
                                >
                                  <FaPlus className="text-xs" />
                                </button>
                              </div>
                            </div>
                            {item.price && (
                              <p className="text-xl font-bold text-pink-600 dark:text-pink-400">
                                Rs. {((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                        <span>Total ({cartItems.length} items)</span>
                        <span className="text-pink-600 dark:text-pink-400">
                          Rs. {getCartTotal().toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleOrderNow}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold text-lg transition-colors"
                  >
                    Order Now
                  </button>

                  <Link
                    to="/"
                    className="block w-full mt-4 px-6 py-3 text-center bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Now Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Order Details</h2>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Cart Items Summary */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Order ({cartItems.length} items)</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-600 last:border-0 last:pb-0">
                      {item.image && (
                        <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={getImageUrl(item.image)}
                            alt={item.name || "Product"}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              handleImageError(e, 0);
                            }}
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        {item.name && (
                          <h4 className="font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                        )}
                        <div className="mt-1 space-y-1 text-sm">
                          {item.price && (
                            <p className="text-gray-700 dark:text-gray-300">
                              Rs. {item.price.toFixed(2)} {item.quantity > 1 && `x ${item.quantity} = Rs. ${(item.price * item.quantity).toFixed(2)}`}
                            </p>
                          )}
                          {item.weight && (
                            <p className="text-gray-600 dark:text-gray-400">Weight: {item.weight}g</p>
                          )}
                          {item.flavours && (
                            <p className="text-gray-600 dark:text-gray-400">Flavours: {item.flavours}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                      <span className="text-xl font-bold text-pink-600 dark:text-pink-400">
                        Rs. {getCartTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
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
                onClick={() => setShowOrderModal(false)}
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

export default Cart;

