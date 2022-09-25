const categoryModel = require("../models/category");
const itemModel = require("../models/item");
const mongoose = require("mongoose");

const defaultRoute = (req, res) => {
  res.redirect("/");
};

const idRoute = async (req, res) => {
  if (
    !mongoose.Types.ObjectId.isValid(req.params.id) ||
    !req.params.id.match(/^[0-9a-fA-F]{24}$/)
  ) {
    res.render("404");
    return;
  }
  // const categoryExists = await categoryModel.exists({ _id: req.params.id });
  const category = await categoryModel.find({ _id: req.params.id });
  // console.log(categoryExists);
  if (Object.keys(category).length !== 0) {
    const categories = await categoryModel.find({});
    const items = await itemModel.find({ category: req.params.id });
    res.render("category", { category, categories, items });
  } else {
    res.render("404");
  }
};

module.exports = { defaultRoute, idRoute };
