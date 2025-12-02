import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTiktok, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
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

  const handleSocialClick = (url) => {
    window.open(url, '_blank');
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/94${contactInfo.whatsapp.replace(/^0/, '')}`, '_blank');
  };

  return (
    <footer className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white relative overflow-hidden">
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#ec4899_0%,transparent_50%)] animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fbbf24_0%,transparent_50%)] rotate-45 animate-pulse-slow delay-1000"></div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in-up">
          
          {/* Company Info */}
          <div className="lg:col-span-1 group">
            <Link to="/" className="flex items-center mb-4 group-hover:scale-105 transition-transform duration-300">
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">Shabee Cake Hub</span>
            </Link>
            <p className="text-gray-300 mb-4 leading-relaxed backdrop-blur-sm bg-white/5 rounded-lg p-3">
              Creating delicious, handcrafted cakes made with love and the finest ingredients. 
              Your happiness is our recipe!
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleSocialClick(contactInfo.facebook)}
                className="text-gray-400 hover:text-pink-400 transition-all duration-300 hover:scale-110 backdrop-blur-sm bg-white/10 rounded-full p-2"
                aria-label="Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleSocialClick(contactInfo.instagram)}
                className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110 backdrop-blur-sm bg-white/10 rounded-full p-2"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleSocialClick(contactInfo.tiktok)}
                className="text-gray-400 hover:text-gray-300 transition-all duration-300 hover:scale-110 backdrop-blur-sm bg-white/10 rounded-full p-2"
                aria-label="TikTok"
              >
                <FaTiktok className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="group">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-md">
              Quick Links
              <span className="block w-0 h-1 bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center"
                >
                  <span className="mr-2">→</span> Home
                </Link>
              </li>
              <li>
                <Link
                  to="/order"
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center"
                >
                  <span className="mr-2">→</span> Online Order
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center"
                >
                  <span className="mr-2">→</span> About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center"
                >
                  <span className="mr-2">→</span> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Cake Categories */}
          <div className="group">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-md">
              Our Cakes
              <span className="block w-0 h-1 bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/category/bento-cakes"
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center"
                >
                  <span className="mr-2">🍰</span> Bento Cakes
                </Link>
              </li>
              <li>
                <Link
                  to="/category/celebration-cakes"
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center"
                >
                  <span className="mr-2">🎉</span> Celebration Cakes
                </Link>
              </li>
              <li>
                <Link
                  to="/category/cupcakes"
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center"
                >
                  <span className="mr-2">🧁</span> Cup Cakes
                </Link>
              </li>
              <li>
                <Link
                  to="/category/desserts"
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center"
                >
                  <span className="mr-2">🍮</span> Desserts
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="group">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-md">
              Contact Info
              <span className="block w-0 h-1 bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </h3>
            <div className="space-y-3 backdrop-blur-sm bg-white/5 rounded-lg p-3">
              <div className="flex items-center space-x-3 hover:bg-pink-500/10 rounded-lg p-2 transition-all duration-300">
                <FaMapMarkerAlt className="h-4 w-4 text-pink-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{contactInfo.address}</span>
              </div>
              <div className="flex items-center space-x-3 hover:bg-pink-500/10 rounded-lg p-2 transition-all duration-300">
                <FaPhone className="h-4 w-4 text-pink-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{contactInfo.phones.join(' / ')}</span>
              </div>
              <button 
                onClick={handleWhatsAppClick}
                className="flex items-center space-x-3 w-full hover:bg-green-500/10 rounded-lg p-2 transition-all duration-300 text-left"
              >
                <FaWhatsapp className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{contactInfo.whatsapp}</span>
              </button>
              <div className="flex items-center space-x-3 hover:bg-pink-500/10 rounded-lg p-2 transition-all duration-300">
                <FaEnvelope className="h-4 w-4 text-pink-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{contactInfo.email}</span>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-6">
              <h4 className="font-medium mb-2 text-pink-400 flex items-center group-hover:scale-105 transition-transform duration-300">
                <FaClock className="h-4 w-4 mr-2" />
                Business Hours
              </h4>
              <div className="text-sm text-gray-300 space-y-1 bg-gradient-to-r from-pink-900/20 to-purple-900/20 rounded-lg p-3 backdrop-blur-sm border border-pink-500/20">
                <div className="flex justify-between items-center">
                  <span>Open Daily:</span>
                  <span className="bg-pink-600 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                    {contactInfo.businessHours}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Order Processing:</span>
                  <span>Within Hours</span>
                </div>
                <div className="mt-2 p-2 bg-pink-900/30 rounded border border-pink-700/50">
                  <p className="text-pink-300 text-xs text-center italic">
                    🎂 Baking happiness daily!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50 dark:border-gray-600/50 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 animate-fade-in-up delay-500">
            <div className="text-gray-400 text-sm backdrop-blur-sm bg-white/5 rounded px-3 py-1">
              © {currentYear} Shabee Cake Hub. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-pink-400 transition-all duration-300 hover:underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-pink-400 transition-all duration-300 hover:underline underline-offset-4"
              >
                Terms of Service
              </Link>
              <Link
                to="/refund"
                className="text-gray-400 hover:text-pink-400 transition-all duration-300 hover:underline underline-offset-4"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-pulse-slow { animation: pulse-slow 4s infinite; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </footer>
  );
};

export default Footer;