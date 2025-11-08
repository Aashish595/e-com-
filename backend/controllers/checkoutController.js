import Cart from "../models/Cart.js";


//  Checkout Controller (simulated)
export const checkout = async (req, res) => {
  try {
    const { userId, paymentMethod } = req.body;

    // Find user cart
    const cart = await Cart.findOne({ userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Verify stock for each product
    for (const item of cart.items) {
      if (item.quantity > item.product.stock) {
        return res.status(400).json({
          message: `Not enough stock for ${item.product.name}`,
        });
      }
    }

    // Reduce stock
    for (const item of cart.items) {
      item.product.stock -= item.quantity;
      await item.product.save();
    }

    // Create a fake order response (you can save to an Order model later)
    const order = {
      userId,
      items: cart.items,
      totalPrice: cart.totalPrice,
      paymentMethod,
      status: "Paid",
      createdAt: new Date(),
    };

    // Clear user cart
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(200).json({
      message: "Checkout successful",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
