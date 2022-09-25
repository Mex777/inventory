const categoryModel = require("../models/category");
const itemModel = require("../models/item");
const mongoose = require("mongoose");

const defaultRoute = (req, res) => {
  res.redirect("/");
};

const idRoute = async (req, res) => {
  const categories = await categoryModel.find({});
  if (
    !mongoose.Types.ObjectId.isValid(req.params.id) ||
    !req.params.id.match(/^[0-9a-fA-F]{24}$/)
  ) {
    res.status(404).render("404", { categories });
    return;
  }
  const category = await categoryModel.find({ _id: req.params.id });
  if (Object.keys(category).length !== 0) {
    const items = await itemModel.find({ category: req.params.id });
    res.render("category", { category, categories, items });
  } else {
    res.status(404).render("404", { categories });
  }
};

module.exports = { defaultRoute, idRoute };
