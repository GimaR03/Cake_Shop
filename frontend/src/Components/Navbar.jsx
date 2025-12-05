import { useState } from 'react';
import { FaShoppingCart, FaSun, FaMoon, FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = ({ darkMode, setDarkMode, user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Define base navigation links
  const getNavLinks = () => {
    const links = [
      { name: 'Home', path: '/' },
      { name: 'Online Order', path: '/order' },
      { name: 'About Us', path: '/about' },
      { name: 'Contact Us', path: '/contact' },
    ];
    
    // Add Admin link if user is admin
    if (user?.role === 'admin') {
      // Insert Admin link before the last item or at a specific position
      links.push({ name: 'Admin', path: '/admin' });
    }
    
    return links;
  };

  const navLinks = getNavLinks();

  // Handle logout
  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };
//create nav bar to navigate files
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                src="/images/logo.png" 
                alt="Shabee Cake Hub Logo" 
                className="h-10 w-10 mr-2"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/40x40?text=Logo';
                }}
              />
              <span className="text-xl font-bold text-pink-600 dark:text-pink-400">
                Shabee Cake Hub
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-4 p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
            </button>
            
            {/* Cart */}
            <Link
              to="/cart"
              className="ml-4 p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 relative transition-colors duration-200"
            >
              <FaShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="ml-4 flex items-center space-x-3">
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  Welcome, <span className="font-semibold">{user.username}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  aria-label="Logout"
                  title="Logout"
                >
                  <FaSignOutAlt className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-4 p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Login"
                title="Login"
              >
                <FaUser className="h-5 w-5" />
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
              aria-expanded={isOpen}
              aria-label="Main menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Actions */}
            <div className="px-3 py-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                {/* Dark Mode Toggle */}
                <button
                  onClick={() => {
                    setDarkMode(!darkMode);
                    setIsOpen(false);
                  }}
                  className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
                </button>
                
                {/* Cart */}
                <Link
                  to="/cart"
                  className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 relative transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <FaShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </Link>
                
                {/* Mobile User Menu */}
                {user ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      {user.username}
                    </span>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      aria-label="Logout"
                    >
                      <FaSignOutAlt className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                    aria-label="Login"
                  >
                    <FaUser className="h-5 w-5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;