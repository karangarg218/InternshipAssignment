const middlware = require("./Controllers/middleware");

const express = require("express");
const router = express.Router();
const ProductController = require("./Controllers/Product");
const UserController = require("./Controllers/User");
router.get("/Products", ProductController.getProducts);
router.get("/Products/:id", ProductController.getProductById);

router.delete(
  "/Products/:id",
  middlware.checkToken,
  ProductController.deleteProduct
);
router.post("/Products", middlware.checkToken, ProductController.createProduct);
router.put(
  "/Products/:id",
  middlware.checkToken,
  ProductController.updateProduct
);

router.post("/User/login", UserController.login);
router.post("/User/signUp", UserController.signUp);

module.exports = router;
