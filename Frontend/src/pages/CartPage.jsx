import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import Cart from '../components/Cart';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, getTotal } = useCart();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
          <ShoppingBag className="mr-3" size={32} />
          Shopping Cart
        </h1>
        <p className="text-gray-600">Review your items and proceed to checkout</p>
      </div>

      <Cart />

      {cart?.items?.length > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-end">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate('/checkout')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Proceed to Checkout (${getTotal().toFixed(2)})
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
