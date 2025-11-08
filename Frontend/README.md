# Full Stack E-Commerce Cart App

A modern, full-featured e-commerce application with shopping cart functionality, built with React, Express, and Supabase (PostgreSQL).

## Features

- 🛍️ Product browsing with detailed information
- 🛒 Full shopping cart functionality
- ➕ Add/update/remove items from cart
- 💳 Checkout process with customer information
- 🧾 Order confirmation with receipt modal
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Context API for state management
- Axios for API calls
- Tailwind CSS for styling
- Lucide React for icons

### Backend
- Node.js + Express
- Supabase (PostgreSQL database)
- RESTful API architecture
- Error handling middleware

## Project Structure

```
/backend
   /config/db.js                    # Database connection
   /controllers/
      productController.js          # Product operations
      cartController.js             # Cart operations
      checkoutController.js         # Checkout operations
   /routes/
      productRoutes.js
      cartRoutes.js
      checkoutRoutes.js
   /middleware/errorMiddleware.js   # Error handling
   server.js                        # Express server
   package.json

/frontend (src/)
   /components/
      ProductList.jsx               # Product grid display
      Cart.jsx                      # Cart items display
      CheckoutForm.jsx              # Checkout form
      ReceiptModal.jsx              # Order confirmation
   /pages/
      Home.jsx                      # Home page
      CartPage.jsx                  # Cart page
      CheckoutPage.jsx              # Checkout page
   /context/CartContext.jsx         # Cart state management
   /api/api.js                      # API integration
   App.jsx                          # Main app component
   main.tsx                         # Entry point
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Cart
- `GET /api/cart?sessionId={id}` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart/clear/all?sessionId={id}` - Clear entire cart

### Checkout
- `POST /api/checkout` - Process order and checkout

## Database Schema

### Tables
- **products** - Product catalog
- **cart_items** - Shopping cart items
- **orders** - Completed orders
- **order_items** - Order line items

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in backend directory with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Install dependencies (in root directory):
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

Application will run on `http://localhost:5173`

## Usage

1. Browse products on the home page
2. Click "Add to Cart" to add items to your shopping cart
3. Navigate to the cart page to review items
4. Adjust quantities or remove items as needed
5. Proceed to checkout
6. Fill in customer information
7. Complete the order to see your receipt

## Development

- Frontend runs on Vite with hot module replacement
- Backend uses nodemon for auto-restart on changes
- Database migrations are handled through Supabase

## License

MIT
