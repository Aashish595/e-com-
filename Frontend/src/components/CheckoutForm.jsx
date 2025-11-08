import { useState } from 'react';
import { CreditCard } from 'lucide-react';

const CheckoutForm = ({ onSubmit, loading, totalAmount }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerAddress: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Email is invalid';
    }
    if (!formData.customerAddress.trim()) {
      newErrors.customerAddress = 'Address is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Checkout Information</h2>

      <div>
        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
            errors.customerName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="John Doe"
        />
        {errors.customerName && (
          <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
        )}
      </div>

      <div>
        <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="customerEmail"
          name="customerEmail"
          value={formData.customerEmail}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
            errors.customerEmail ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="john@example.com"
        />
        {errors.customerEmail && (
          <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>
        )}
      </div>

      <div>
        <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700 mb-2">
          Shipping Address
        </label>
        <textarea
          id="customerAddress"
          name="customerAddress"
          value={formData.customerAddress}
          onChange={handleChange}
          rows={3}
          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
            errors.customerAddress ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="123 Main St, City, State, ZIP"
        />
        {errors.customerAddress && (
          <p className="text-red-500 text-sm mt-1">{errors.customerAddress}</p>
        )}
      </div>

      <div className="bg-blue-50 rounded-lg p-4 mt-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Order Total:</span>
          <span className="text-2xl font-bold text-blue-600">${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : (
          <>
            <CreditCard size={20} className="mr-2" />
            Complete Order
          </>
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;
