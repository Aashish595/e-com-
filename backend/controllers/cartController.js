import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    console.log("🛒 Incoming request body:", req.body);

    const { userId, productId, quantity = 1, replace = false } = req.body;

    // Validate input
    if (!userId || !productId) {
      return res.status(400).json({ 
        message: "userId and productId are required" 
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find or create a cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [], totalPrice: 0 });
    }

    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product && item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      if (replace) {
        // Replace the quantity (current behavior)
        cart.items[existingItemIndex].quantity = parseInt(quantity);
        console.log(`🔄 Replaced quantity for product ${productId} to ${quantity}`);
      } else {
        // Increment the quantity (new behavior)
        cart.items[existingItemIndex].quantity += parseInt(quantity);
        console.log(`➕ Incremented quantity for product ${productId} to ${cart.items[existingItemIndex].quantity}`);
      }
    } else {
      // Add new item
      cart.items.push({ product: productId, quantity: parseInt(quantity) });
      console.log(`🆕 Added new product ${productId} with quantity ${quantity}`);
    }

    // Remove any invalid items
    cart.items = cart.items.filter((item) => item.product);

    // Recalculate total price
    const allProducts = await Product.find({
      _id: { $in: cart.items.map((item) => item.product) },
    });

    cart.totalPrice = cart.items.reduce((total, item) => {
      const foundProduct = allProducts.find(
        (p) => p._id.toString() === item.product.toString()
      );
      return total + (foundProduct?.price || 0) * item.quantity;
    }, 0);

    await cart.save();
    
    // Populate the cart before sending response
    const populatedCart = await Cart.findById(cart._id).populate("items.product");

    console.log("✅ Cart updated successfully");
    
    res.status(200).json(populatedCart);
    
  } catch (error) {
    console.error("❌ Add to cart error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get user cart
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    let cart = await Cart.findOne({ userId }).populate("items.product");

    if (!cart) {
      cart = new Cart({ userId, items: [], totalPrice: 0 });
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    console.error("❌ Get cart error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ 
        message: "userId and productId are required" 
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    // Recalculate total price
    const allProducts = await Product.find({
      _id: { $in: cart.items.map((item) => item.product) },
    });

    cart.totalPrice = cart.items.reduce((total, item) => {
      const p = allProducts.find(
        (prod) => prod._id.toString() === item.product.toString()
      );
      return total + (p?.price || 0) * item.quantity;
    }, 0);

    await cart.save();
    
    // Populate before sending response
    const populatedCart = await Cart.findById(cart._id).populate("items.product");
    
    res.status(200).json(populatedCart);
  } catch (error) {
    console.error("❌ Remove from cart error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Clear entire cart
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("❌ Clear cart error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    console.log("📝 Update cart request body:", req.body);

    const { userId, productId, quantity } = req.body;

    // Validate input
    if (!userId || !productId || quantity === undefined) {
      return res.status(400).json({ 
        message: "userId, productId, and quantity are required" 
      });
    }

    // Validate quantity
    if (quantity < 0) {
      return res.status(400).json({ 
        message: "Quantity cannot be negative" 
      });
    }

    // Find the cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item in cart
    const cartItemIndex = cart.items.findIndex(
      (item) => item.product && item.product.toString() === productId
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (quantity === 0) {
      // Remove item if quantity is 0
      cart.items.splice(cartItemIndex, 1);
    } else {
      // Update quantity
      cart.items[cartItemIndex].quantity = quantity;
    }

    // Remove any invalid items
    cart.items = cart.items.filter((item) => item.product);

    // Recalculate total price
    const allProducts = await Product.find({
      _id: { $in: cart.items.map((item) => item.product) },
    });

    cart.totalPrice = cart.items.reduce((total, item) => {
      const foundProduct = allProducts.find(
        (p) => p._id.toString() === item.product.toString()
      );
      return total + (foundProduct?.price || 0) * item.quantity;
    }, 0);

    await cart.save();
    
    // Populate the cart before sending response
    const populatedCart = await Cart.findById(cart._id).populate("items.product");

    console.log("✅ Cart item updated successfully");
    res.status(200).json(populatedCart);
    
  } catch (error) {
    console.error("❌ Update cart item error:", error);
    res.status(500).json({ message: error.message });
  }
};