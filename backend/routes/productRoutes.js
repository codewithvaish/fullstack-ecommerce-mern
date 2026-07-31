const express = require("express");

const router = express.Router();

const {
  addProduct,
  getProducts,
  getProductById,
} = require("../controllers/productController");

// Add Product
router.post("/", addProduct);

// Get All Products
router.get("/", getProducts);

// Get Single Product
router.get("/:id", getProductById);

module.exports = router;