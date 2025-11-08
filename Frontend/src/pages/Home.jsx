import ProductList from '../components/ProductList';

const Home = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Products</h1>
        <p className="text-gray-600">Browse our collection of premium tech products</p>
      </div>
      <ProductList />
    </div>
  );
};

export default Home;
