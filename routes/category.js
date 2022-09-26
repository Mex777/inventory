var express = require("express");
var router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.defaultRoute);

router.get("/add", categoryController.add);

router.get("/:id", categoryController.idRoute);

router.post("/", categoryController.post);

module.exports = router;
