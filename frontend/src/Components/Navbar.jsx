import { useState, useEffect } from 'react';
import { FaShoppingCart, FaSun, FaMoon, FaBars, FaTimes, FaUser, FaLock, FaEye, FaEyeSlash, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { API_ENDPOINTS } from '../config/api';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  // Check if user is logged in and if admin
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      const isUserLoggedIn = !!(token && user);
      setIsLoggedIn(isUserLoggedIn);
      
      if (isUserLoggedIn && user) {
        try {
          const userData = JSON.parse(user);
          setIsAdmin(userData.role === 'admin' || userData.username === 'ShabeeCakeHub');
        } catch (error) {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkLoginStatus();
    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkLoginStatus);
    // Check on component mount and when navigating
    const interval = setInterval(checkLoginStatus, 1000);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      clearInterval(interval);
    };
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
    setLoginError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (data.success) {
        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Close login form
        setShowLoginForm(false);
        setLoginData({ username: '', password: '' });
        
        // Update login status
        setIsLoggedIn(true);
        
        // Redirect based on role or username
        if (data.user.role === 'admin' || loginData.username === 'ShabeeCakeHub') {
          navigate('/admin');
        } else {
          navigate('/');
          window.location.reload();
        }
      } else {
        setLoginError(data.message || 'Login failed');
      }
    } catch (error) {
      setLoginError('Network error. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Update login status
    setIsLoggedIn(false);
    
    // Close login form if open
    setShowLoginForm(false);
    
    // Redirect to home page
    navigate('/');
    window.location.reload();
  };

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
              />
              <span className="text-xl font-bold text-pink-600 dark:text-pink-400">
                Shabee Cake Hub
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-pink-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {link.name}
              </Link>
            ))}

            {/* Login/Logout Icon */}
            <div className="ml-4 relative">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Logout"
                >
                  <FaSignOutAlt />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setShowLoginForm(!showLoginForm)}
                    className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="Login"
                  >
                    <FaUser />
                  </button>

                  {/* Login Dropdown Form */}
                  {showLoginForm && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-200 dark:border-gray-700">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Login</h3>
                      <button
                        onClick={() => {
                          setShowLoginForm(false);
                          setLoginError('');
                        }}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <FaTimes />
                      </button>
                    </div>

                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                      {loginError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
                          {loginError}
                        </div>
                      )}

                      <div>
                        <label htmlFor="navbar-username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Username
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            id="navbar-username"
                            name="username"
                            type="text"
                            required
                            value={loginData.username}
                            onChange={handleLoginChange}
                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                            placeholder="Enter username"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="navbar-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            id="navbar-password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={loginData.password}
                            onChange={handleLoginChange}
                            className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                            placeholder="Enter password"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <FaEyeSlash className="h-4 w-4 text-gray-400" />
                            ) : (
                              <FaEye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loginLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
                      >
                        {loginLoading ? 'Signing in...' : 'Sign in'}
                      </button>

                      <div className="text-center">
                        <Link
                          to="/register"
                          onClick={() => setShowLoginForm(false)}
                          className="text-sm font-medium text-pink-600 hover:text-pink-500 dark:text-pink-400"
                        >
                          Don't have an account? Register
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                  )}
                </>
              )}
            </div>

            {/* Dark Mode */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-4 p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* Cart - Only show for non-admin users */}
            {!isAdmin && (
              <Link to="/cart" className="ml-4 p-2 relative" title="View Cart">
                <FaShoppingCart className="text-gray-700 dark:text-gray-200" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Register
            </Link>
            {/* Cart - Only show for non-admin users in mobile menu */}
            {!isAdmin && (
              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                <FaShoppingCart />
                Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
