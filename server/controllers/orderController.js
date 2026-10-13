const {
  createOrder,
  getOrdersByUser,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  getOrderByIdForAdmin,
  getRecentOrders,
  deleteOrder,
} = require("../services/orderService");

const addOrder = async (req, res, next) => {
  try {
    const { items } = req.body;

    const userId = req.user.id;

    const order = await createOrder(
      userId,
      items
    );

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const orders = await getOrdersByUser(userId);

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const getSingleOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await getOrderById(id, userId);

    if (order.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);

  } catch (error) {
    next(error);
  }
};

const getAllOrdersHandler = async (req, res, next) => {
  try {
    const orders = await getAllOrders();

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const updateOrderStatusHandler = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedTransitions = {
      pending: ["processing", "cancelled"],

      processing: ["shipped", "cancelled"],

      shipped: ["delivered"],

      delivered: [],

      cancelled: [],
    };

    if (!allowedTransitions[status]) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const currentOrder = await getOrderByIdForAdmin(id);

    if (!currentOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const allowedNextStatuses =
      allowedTransitions[currentOrder.status];

    if (!allowedNextStatuses.includes(status)) {
      return res.status(400).json({
        message: `Cannot change order from ${currentOrder.status} to ${status}`,
      });
    }

    const order = await updateOrderStatus(
      id,
      status
    );

    res.json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

const getRecentOrdersHandler = async (req, res, next) => {
  try {
    const orders = await getRecentOrders();

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const deleteMyOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await deleteOrder(id, userId);

    if (!order) {
      return res.status(400).json({
        message:
          "Only delivered or cancelled orders can be deleted",
      });
    }

    res.json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addOrder,
  getMyOrders,
  getSingleOrder,
  getAllOrdersHandler,
  updateOrderStatusHandler,
  getRecentOrdersHandler,
  deleteMyOrder,
};