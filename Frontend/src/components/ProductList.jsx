import { useState, useEffect } from 'react';
import { ShoppingCart, Package } from 'lucide-react';
import { getAllProducts } from '../api/api';
import { useCart } from '../context/CartContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState({});
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    setAddingToCart(prev => ({ ...prev, [productId]: true }));
    try {
      await addToCart(productId, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(prev => ({ ...prev, [productId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative h-48 bg-gray-200 overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            {product.stock > 0 && product.stock < 20 && (
              <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                Only {product.stock} left
              </div>
            )}
          </div>
          <div className="p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-blue-600">${product.price}</span>
              <div className="flex items-center text-sm text-gray-500">
                <Package size={16} className="mr-1" />
                <span>{product.stock} in stock</span>
              </div>
            </div>
            <button
              onClick={() => handleAddToCart(product._id)}
              disabled={product.stock === 0 || addingToCart[product._id]}
              className={`w-full py-2.5 px-4 rounded-lg font-medium flex items-center justify-center transition-colors ${
                product.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {addingToCart[product._id] ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <ShoppingCart size={18} className="mr-2" />
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
