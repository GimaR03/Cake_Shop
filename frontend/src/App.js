import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Admin from './Components/Admin';
import About from './Components/About';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Register from './Components/Register';
import ProtectedAdminRoute from './Components/ProtectedAdminRoute';
import CategoryProducts from './Components/CategoryProducts';
import Cart from './Components/Cart';

const OnlineOrder = () => <div className="pt-20"><h1>Online Order</h1></div>;

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  return (
    <CartProvider>
      <Router>
        <div className={darkMode ? 'dark' : ''}>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/order" element={<OnlineOrder />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/category/:categoryName" element={<CategoryProducts />} />

              {/* Protected Admin Route - Only accessible with ShabeeCakeHub credentials */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedAdminRoute>
                    <Admin />
                  </ProtectedAdminRoute>
                } 
              />

              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
