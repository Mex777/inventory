const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: String,
  description: String,
});

const model = mongoose.model("Category", categorySchema);

module.exports = model;
