const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  price: Number,
  category: mongoose.Types.ObjectId,
});

const model = mongoose.model("Item", itemSchema);

module.exports = model;
