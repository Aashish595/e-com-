// routes/cartRoutes.js
import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  updateCartItem,
} from "../controllers/cartController.js";


const router = express.Router();

router.post("/add", addToCart);
router.get("/:userId", getCart);
router.delete("/remove", removeFromCart);
router.delete("/clear/:userId", clearCart);
router.put("/update", updateCartItem);



export default router;





