import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, loading, updateQuantity, removeFromCart, getTotal } = useCart();

  const handleQuantityChange = async (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      await updateQuantity(productId, newQuantity);
    } else if (newQuantity === 0) {
      await removeFromCart(productId);
    }
  };

  const handleRemove = async (productId) => {
    await removeFromCart(productId);
  };

  const items = cart?.items || [];

  if (loading && items.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        // Debug log to see the actual item structure
        console.log('🛒 Cart item:', item);
        
        // Get the product ID - try different possible properties
        const productId = item.product?._id || item.productId || item._id;
        
        if (!productId) {
          console.error('❌ No product ID found for item:', item);
          return null; // Skip rendering if no product ID
        }

        return (
          <div
            key={item._id || productId}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <img
              src={item.product?.image_url}
              alt={item.product?.name}
              className="w-24 h-24 object-cover rounded-md"
              onError={(e) => {
                e.target.src = '/images/placeholder.jpg';
              }}
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.product?.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {item.product?.description}
              </p>
              <p className="text-lg font-bold text-blue-600 mt-2">
                ${item.product?.price}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-gray-100 rounded-lg">
                <button
                  onClick={() =>
                    handleQuantityChange(
                      productId,
                      item.quantity,
                      -1
                    )
                  }
                  disabled={loading}
                  className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors disabled:opacity-50"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 font-semibold min-w-12 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    handleQuantityChange(
                      productId,
                      item.quantity,
                      1
                    )
                  }
                  disabled={loading}
                  className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors disabled:opacity-50"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={() => handleRemove(productId)}
                disabled={loading}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        );
      })}
      <div className="bg-blue-50 rounded-lg p-6 mt-6">
        <div className="flex justify-between items-center text-xl font-bold">
          <span className="text-gray-800">Total:</span>
          <span className="text-blue-600">${getTotal().toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;