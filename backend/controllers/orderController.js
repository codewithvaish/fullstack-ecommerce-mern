const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const {
      products,
      shippingAddress,
      paymentMethod,
      totalPrice,
    } = req.body;

    if (
      !products ||
      products.length === 0 ||
      !shippingAddress ||
      !paymentMethod ||
      !totalPrice
    ) {
      return res.status(400).json({
        message: "Please provide all required fields.",
      });
    }

    const order = await Order.create({
      user: req.user._id,
      products,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};    

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
};