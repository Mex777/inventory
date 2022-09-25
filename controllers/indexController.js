const itemModel = require("../models/item");
const categoriesModel = require("../models/category");

const home = async (req, res) => {
  const items = await itemModel.find({}).limit(5);
  const categories = await categoriesModel.find({});
  res.render("index", { items, categories });
};

module.exports = { home };
