import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaWhatsapp, FaFacebook, FaInstagram, FaTiktok, FaEnvelope, FaClock } from 'react-icons/fa';

const Contact = () => {
  const contactInfo = {
    address: "No.220/1, Phalakondadeniya, Katugastota",
    googleMapsLink: "https://maps.app.goo.gl/ftzLdXAMijhFaSVc8",
    phones: ["0761530112", "0768304426"],
    whatsapp: "0761530112",
    email: "shabeescakehub@gmail.com",
    businessHours: "Open Daily: 8:00 AM - 8:00 PM",
    facebook: "https://www.facebook.com/profile.php?id=100088583410943",
    instagram: "https://www.instagram.com/shabeescakehub?igsh=YzljYTk1ODg3Zg==",
    tiktok: "https://vm.tiktok.com/ZSFKD8NSq/"
  };

  const handlePhoneClick = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/94${contactInfo.whatsapp.replace(/^0/, '')}`, '_blank');
  };

  const handleSocialClick = (url) => {
    window.open(url, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${contactInfo.email}`;
  };

  const handleAddressClick = () => {
    window.open(contactInfo.googleMapsLink, '_blank');
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Shabee Cake Hub
          </h1>
          <div className="w-24 h-1 bg-pink-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get in touch with us for delicious homemade cakes and custom orders. We're here to make your celebrations sweeter!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Contact Information */}
          <div className="space-y-8">
            {/* Logo Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
              <div className="flex flex-col items-center">
                <div className="mb-6 p-4 bg-pink-50 dark:bg-gray-700 rounded-full">
                  <img 
                    src="/images/logo.png" 
                    alt="Shabee Cake Hub Logo" 
                    className="h-32 w-32 object-contain"
                  />
                </div>
                <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                  Shabee Cake Hub
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Homemade Cakes with Love
                </p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
                Get in Touch
              </h2>
              
              {/* Address */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-pink-100 dark:bg-gray-700 p-3 rounded-full">
                  <FaMapMarkerAlt className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Our Location</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {contactInfo.address}
                  </p>
                  <button
                    onClick={handleAddressClick}
                    className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-medium flex items-center space-x-1"
                  >
                    <span>View on Google Maps</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-pink-100 dark:bg-gray-700 p-3 rounded-full">
                  <FaPhone className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Call Us</h3>
                  {contactInfo.phones.map((phone, index) => (
                    <div key={index} className="mb-2">
                      <button
                        onClick={() => handlePhoneClick(phone)}
                        className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 flex items-center space-x-2"
                      >
                        <span>{phone}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                  <FaWhatsapp className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">WhatsApp</h3>
                  <button
                    onClick={handleWhatsAppClick}
                    className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 flex items-center space-x-2"
                  >
                    <span>{contactInfo.whatsapp}</span>
                    <span>(Click to chat)</span>
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-pink-100 dark:bg-gray-700 p-3 rounded-full">
                  <FaEnvelope className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email Us</h3>
                  <button
                    onClick={handleEmailClick}
                    className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400"
                  >
                    {contactInfo.email}
                  </button>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start space-x-4">
                <div className="bg-pink-100 dark:bg-gray-700 p-3 rounded-full">
                  <FaClock className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Business Hours</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {contactInfo.businessHours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Social Media & Map */}
          <div className="space-y-8">
            {/* Social Media Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
                Follow Us
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Stay connected with us on social media for the latest cake designs, promotions, and updates!
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Facebook */}
                <button
                  onClick={() => handleSocialClick(contactInfo.facebook)}
                  className="bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-300 group"
                >
                  <FaFacebook className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-gray-900 dark:text-white">Facebook</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">Like & Follow</span>
                </button>

                {/* Instagram */}
                <button
                  onClick={() => handleSocialClick(contactInfo.instagram)}
                  className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 hover:from-pink-100 hover:to-purple-100 dark:hover:from-pink-900/30 dark:hover:to-purple-900/30 rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-300 group"
                >
                  <FaInstagram className="h-10 w-10 text-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 mb-3 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-gray-900 dark:text-white">Instagram</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">Follow</span>
                </button>

                {/* TikTok */}
                <button
                  onClick={() => handleSocialClick(contactInfo.tiktok)}
                  className="bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-300 group"
                >
                  <FaTiktok className="h-10 w-10 text-gray-900 dark:text-white mb-3 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-gray-900 dark:text-white">TikTok</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">Follow</span>
                </button>
              </div>
            </div>

            {/* Google Maps Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
                Find Us on Map
              </h2>
              
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden h-96 relative">
                {/* Map Placeholder with Click Action */}
                <button
                  onClick={handleAddressClick}
                  className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-white dark:from-gray-800 dark:to-gray-900 group"
                >
                  <div className="text-center p-6">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-full mb-4 inline-block">
                      <FaMapMarkerAlt className="h-12 w-12 text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      View Our Location
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-xs">
                      Click to open in Google Maps
                    </p>
                    <div className="bg-pink-600 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center space-x-2 group-hover:bg-pink-700 transition-colors">
                      <span>Open Google Maps</span>
                      <span>→</span>
                    </div>
                  </div>
                </button>
              </div>
              
              <div className="mt-4 p-4 bg-pink-50 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Note:</strong> Click on the map area or use the "View on Google Maps" button above to get directions to our location.
                </p>
              </div>
            </div>

            {/* Quick Contact Form (Optional) */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Message
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Prefer to message us directly? Use WhatsApp for the fastest response!
              </p>
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-3 transition-colors"
              >
                <FaWhatsapp className="h-6 w-6" />
                <span>Message us on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;