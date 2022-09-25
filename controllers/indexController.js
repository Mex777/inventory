const itemModel = require("../models/item");

const home = async (req, res) => {
  const items = await itemModel.find({}).limit(5);
  res.render("index", { items });
};

module.exports = { home };
