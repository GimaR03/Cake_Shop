import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }

    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUsername(user.username);
    }

    // Fetch categories from backend
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback to default categories if API fails
      setCategories([
        {
          id: 1,
          name: 'Bento Cakes',
          image: './images/bentocake.webp',
          description: 'Adorable single-serving cakes perfect for gifting!',
          basePrice: 25.00
        },
        {
          id: 2,
          name: 'Cakes',
          image: './images/cakes.webp',
          description: 'Timeless favorites for every occasion',
          basePrice: 30.00
        }
      ]);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Hero Section */}
      <div className="pt-20 pb-16 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Welcome to</span>
              <span className="block text-pink-600 dark:text-pink-400">
                {username ? `${username}` : 'Shabee Cake Hub'}
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Delicious, handcrafted cakes made with love and the finest ingredients.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                to="/order"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
              >
                Order Now
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-pink-600 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-pink-400 dark:hover:bg-gray-700"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Our Cake Categories
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
              Explore our delicious range of cakes for every occasion
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {categories.map((category) => (
                <div key={category._id || category.id} className="pt-6">
                  <div className="flow-root bg-gray-50 dark:bg-gray-800 rounded-lg px-6 pb-8 h-full">
                    <div className="-mt-6 h-full flex flex-col">
                      <div className="relative h-48">
                        <img
                          className="w-full h-full object-cover rounded-lg"
                          src={category.image}
                          alt={category.name}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                        <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white">
                          {category.name}
                        </h3>
                      </div>
                      <p className="mt-4 text-base text-gray-500 dark:text-gray-300 flex-grow">
                        {category.description}
                      </p>
                      <div className="mt-2">
                        <p className="text-lg font-bold text-pink-600 dark:text-pink-400">
                          From ${category.basePrice}
                        </p>
                      </div>
                      <div className="mt-4">
                        <Link
                          to={`/category/${category._id || category.id}`}
                          className="text-base font-medium text-pink-600 hover:text-pink-500 dark:text-pink-400 dark:hover:text-pink-300 inline-flex items-center"
                        >
                          View Collection
                          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;