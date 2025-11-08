import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

const Navigation = () => {
  const { getItemCount } = useCart();

  return (
    <nav className="bg-white shadow-md mb-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
            <Store size={28} />
            <span className="text-xl font-bold">TechStore</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors relative"
          >
            <ShoppingCart size={24} />
            <span className="font-medium">Cart</span>
            {getItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {getItemCount()}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

const AppContent = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

export default App;
