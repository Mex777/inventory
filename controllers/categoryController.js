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
  const category = await categoryModel.findOne({ _id: req.params.id });
  if (Object.keys(category).length !== 0) {
    const items = await itemModel.find({ category: req.params.id });
    res.render("category", { category, categories, items });
  } else {
    res.status(404).render("404", { categories });
  }
};

const add = async (req, res) => {
  const categories = await categoryModel.find({});
  res.render("addPage", { categories });
};

const post = async (req, res) => {
  console.log(req.body);
  const newCat = new categoryModel({
    name: req.body.title,
    description: req.body.description,
  });
  await newCat.save();
  res.redirect("/category/" + newCat._id);
};

const addItem = async (req, res) => {
  console.log(req.params);
  const categories = await categoryModel.find({});
  const newItem = new itemModel({
    name: req.body.name,
    price: req.body.price,
    category: req.params.id,
  });
  await newItem.save();
  // console.log(req.path);
  res.redirect(`${req.params.id}`);
};

module.exports = { defaultRoute, idRoute, add, post, addItem };
