var express = require("express");
var router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.defaultRoute);

router.get("/:id", categoryController.idRoute);

module.exports = router;
