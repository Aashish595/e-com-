import { CheckCircle, X } from 'lucide-react';

const ReceiptModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle className="text-green-500 mr-3" size={32} />
            <h2 className="text-2xl font-bold text-gray-800">Order Confirmed!</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 text-center">
              Thank you for your order! We've sent a confirmation email to{' '}
              <span className="font-semibold">{order.customer_email}</span>
            </p>
          </div>

          <div className="border rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-gray-800 text-lg border-b pb-2">Order Details</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-600">Order ID:</p>
                <p className="font-mono text-gray-800">{order.id.slice(0, 8)}</p>
              </div>
              <div>
                <p className="text-gray-600">Date:</p>
                <p className="text-gray-800">{new Date(order.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Customer Name:</p>
                <p className="text-gray-800">{order.customer_name}</p>
              </div>
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="text-gray-800">{order.customer_email}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Shipping Address:</p>
              <p className="text-gray-800">{order.customer_address}</p>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 text-lg border-b pb-2 mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.order_items?.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-800">{item.product_name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-blue-600">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-gray-800">Total Amount:</span>
              <span className="text-3xl font-bold text-blue-600">${order.total_amount}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
