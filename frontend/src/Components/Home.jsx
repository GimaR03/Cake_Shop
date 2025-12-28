import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }

    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setNickname(user.nickname || '');
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.CATEGORIES);
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories);
      } else {
        setFallbackCategories();
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setFallbackCategories();
    }
  };

  const setFallbackCategories = () => {
    setCategories([
      {
        _id: 1,
        name: 'Bento Cakes',
        image: '/images/bentocake.webp'
      },
      {
        _id: 2,
        name: 'Cakes',
        image: '/images/cakes.webp'
      },
      {
        _id: 3,
        name: 'Celebration Cakes',
        image: '/images/CelebrationCake.jpg'
      },
      {
        _id: 4,
        name: 'Desserts',
        image: '/images/Desserts.png'
      },
      {
        _id: 5,
        name: 'Cup Cakes',
        image: '/images/Cupcakes.webp'
      }
    ]);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Hero Section */}
      <div className="pt-20 pb-16 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            {nickname ? (
              <>
                <span className="block text-pink-600 dark:text-pink-400">
                  Hi welcome {nickname}!
                </span>
                <span className="block text-3xl mt-4 text-gray-700 dark:text-gray-300">
                  to Shabee Cake Hub
                </span>
              </>
            ) : (
              <>
                <span className="block">Welcome to</span>
                <span className="block text-pink-600 dark:text-pink-400">
                  Shabee Cake Hub
                </span>
              </>
            )}
          </h1>

          <p className="mt-3 max-w-2xl mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg">
            {nickname
              ? 'Thank you for visiting! Explore our delicious handcrafted cakes made with love.'
              : 'Delicious, handcrafted cakes made with love and the finest ingredients.'}
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 text-white bg-pink-600 rounded-md hover:bg-pink-700"
            >
              Order Now
            </Link>

            <Link
              to="/about"
              className="px-6 py-3 text-pink-600 bg-white rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-pink-400"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

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
                          'https://via.placeholder.com/400x300?text=Image+Not+Found';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-lg" />
                    <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white text-center">
                      {category.name}
                    </h3>
                  </div>

                  {/* View Category Button */}
                  <div className="mt-6">
                    <Link
                      to={`/category/${encodeURIComponent(category.name)}`}
                      className="w-full inline-block text-center px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
                    >
                      View Category
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Cake Call-to-Action */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">Can't Find What You Need?</h3>
              <p className="mb-6">We specialize in custom cakes for all occasions!</p>
              <Link
                to="/contact"
                className="px-6 py-3 bg-white text-pink-600 rounded-md hover:bg-gray-100"
              >
                Request Custom Cake
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
