import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { processCheckout } from '../api/api';
import { useCart } from '../context/CartContext';
import CheckoutForm from '../components/CheckoutForm';
import ReceiptModal from '../components/ReceiptModal';
import Cart from '../components/Cart';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getTotal, sessionId } = useCart();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  const handleCheckout = async (formData) => {
    setLoading(true);
    try {
      const checkoutData = {
        sessionId,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerAddress: formData.customerAddress,
        cartItems: cart,
        totalAmount: getTotal(),
      };

      const orderData = await processCheckout(checkoutData);
      setOrder(orderData);
    } catch (error) {
      console.error('Error processing checkout:', error);
      alert('Failed to process order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseReceipt = () => {
    setOrder(null);
    navigate('/');
  };

  if (cart.length === 0 && !order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Checkout</h1>
        <p className="text-gray-600">Complete your order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
          <Cart />
        </div>
        <div>
          <CheckoutForm
            onSubmit={handleCheckout}
            loading={loading}
            totalAmount={getTotal()}
          />
        </div>
      </div>

      {order && <ReceiptModal order={order} onClose={handleCloseReceipt} />}
    </div>
  );
};

export default CheckoutPage;
