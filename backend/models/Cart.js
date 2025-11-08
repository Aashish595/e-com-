import mongoose from "mongoose";
const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
