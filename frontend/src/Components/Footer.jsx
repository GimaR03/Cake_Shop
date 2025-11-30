import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
//bottom footer with 4 columns: company info, quick links, cake categories, contact info including 24/7 business hours
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-pink-400">Shabee Cake Hub</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Creating delicious, handcrafted cakes made with love and the finest ingredients. 
              Your happiness is our recipe!
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-pink-400 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-pink-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/order"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Online Order
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Cake Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-400">Our Cakes</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/category/bento-cakes"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Bento Cakes
                </Link>
              </li>
              <li>
                <Link
                  to="/category/celebration-cakes"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Celebration Cakes
                </Link>
              </li>
              <li>
                <Link
                  to="/category/cupcakes"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Cup Cakes
                </Link>
              </li>
              <li>
                <Link
                  to="/category/desserts"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Desserts
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-400">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="h-4 w-4 text-pink-400 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Cake Street, Sweet City, SC 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="h-4 w-4 text-pink-400 flex-shrink-0" />
                <span className="text-gray-300">
                  +1 (555) 123-CAKE
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="h-4 w-4 text-pink-400 flex-shrink-0" />
                <span className="text-gray-300">
                  orders@shabeecakehub.com
                </span>
              </div>
            </div>

            {/* Business Hours - 24 Hours */}
            <div className="mt-4">
              <h4 className="font-medium mb-2 text-pink-400 flex items-center">
                <FaClock className="h-4 w-4 mr-2" />
                Business Hours
              </h4>
              <div className="text-sm text-gray-300 space-y-1">
                <div className="flex justify-between items-center">
                  <span>24/7 Online Orders:</span>
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                    Always Open
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Online Support:</span>
                  <span>24 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Order Processing:</span>
                  <span>24/7</span>
                </div>
                <div className="mt-2 p-2 bg-green-900/30 rounded border border-green-700/50">
                  <p className="text-green-300 text-xs text-center">
                    🎂 Order anytime! We're always baking happiness!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 dark:border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Shabee Cake Hub. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/refund"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;