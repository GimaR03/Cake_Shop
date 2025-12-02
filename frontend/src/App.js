import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Admin from './Components/Admin';
import About from './Components/About';
import Contact from './Components/Contact'; // Import the new Contact component
import Footer from './Components/Footer';

// Placeholder components for other routes
const OnlineOrder = () => <div className="min-h-screen pt-16 bg-white dark:bg-gray-900"><h1 className="text-4xl font-bold text-center mt-10 text-gray-900 dark:text-white">Online Order</h1></div>;
const Cart = () => <div className="min-h-screen pt-16 bg-white dark:bg-gray-900"><h1 className="text-4xl font-bold text-center mt-10 text-gray-900 dark:text-white">Your Cart</h1></div>;

// Register component (keep as is)
const Register = ({ updateUser }) => {
  // ... (keep all existing Register component code)
};

// Protected Route component (keep as is)
const ProtectedRoute = ({ children, adminOnly = false }) => {
  // ... (keep all existing ProtectedRoute component code)
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for dark mode preference on initial load
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }

    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Listen for storage changes
    const handleStorageChange = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Update document class and localStorage when darkMode state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [darkMode]);

  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} user={user} updateUser={updateUser} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/order" element={<OnlineOrder />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> {/* Use the new Contact component */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login updateUser={updateUser} />} />
            <Route path="/register" element={<Register updateUser={updateUser} />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <Admin />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;