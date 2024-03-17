const express = require('express');
const ordersRouter = express.Router();
const { getAllOrders, createOrder } = require('../db/orders');

ordersRouter.get('/admin/orders', async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

ordersRouter.post('/orders', async (req, res, next) => {
  const { userId, orderDate, shippingAddress, status } = req.body;
  try {
    const order = await createOrder(userId, orderDate, shippingAddress, status);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

// Add more routes as needed

module.exports = ordersRouter;