const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  contact: {
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    email: String,
  },
  products: [String],
});

const OrderModel = mongoose.model("order", OrderSchema);

module.exports = OrderModel;
