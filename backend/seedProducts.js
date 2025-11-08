import mongoose from "mongoose";
import Product from "./models/Product.js";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();


const products = [
  {
    name: "iPhone 15 Pro",
    description: "Apple A17 Pro, Titanium body",
    price: 1299,
    stock: 12,
    category: "Electronics",
    image_url: "https://images.unsplash.com/photo-1695653424259-d12c546c23ce?w=500",
  },
  {
    name: "MacBook Pro 16 M3",
    description: "Apple Silicon M3 Pro, 18GB RAM",
    price: 2499,
    stock: 8,
    category: "Electronics",
    image_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
  },
  {
    name: "Sony WH-1000XM5",
    description: "Noise-cancelling Bluetooth headphones",
    price: 399,
    stock: 15,
    category: "Electronics",
    image_url: "https://images.unsplash.com/photo-1613985541489-7b2e04f7f7b9?w=500",
  },
  {
    name: "Nike Air Max 270",
    description: "Stylish and comfortable sneakers",
    price: 179,
    stock: 20,
    category: "Footwear",
    image_url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
  },
  {
    name: "Apple Watch Ultra 2",
    description: "Rugged smartwatch with GPS + LTE",
    price: 799,
    stock: 10,
    category: "Wearables",
    image_url: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=500",
  },
  {
    name: "Logitech MX Master 3S",
    description: "Ergonomic wireless mouse",
    price: 99,
    stock: 25,
    category: "Electronics",
    image_url: "https://images.unsplash.com/photo-1606813903123-f0e5e43b99d6?w=500",
  },
  {
    name: "GoPro Hero 12",
    description: "Action camera for outdoor adventures",
    price: 499,
    stock: 14,
    category: "Electronics",
    image_url: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=500",
  },
  {
    name: "Kindle Paperwhite",
    description: "E-reader with adjustable warm light",
    price: 159,
    stock: 30,
    category: "Electronics",
    image_url: "https://images.unsplash.com/photo-1523473827534-86c46a9c7d11?w=500",
  },
  {
    name: "Apple AirPods Pro 2",
    description: "Wireless earbuds with ANC",
    price: 249,
    stock: 50,
    category: "Electronics",
    image_url: "https://images.unsplash.com/photo-1587574293340-e7163c80b5ec?w=500",
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Flagship Android with 200MP camera",
    price: 1199,
    stock: 18,
    category: "Electronics",
    image_url: "https://images.unsplash.com/photo-1606813903123-f0e5e43b99d6?w=500",
  },
];

const seedProducts = async () => {
  try {
    await connectDB(); //  connect to your DB
    await Product.deleteMany(); // optional: clear old data
    await Product.insertMany(products); // insert all
    console.log(" Products added successfully!");
  } catch (err) {
    console.error(" Error seeding products:", err.message);
  } finally {
    mongoose.connection.close();
  }
};

seedProducts();
