import { Router } from "express";
import ProductsControllers from "../controllers/ProductControllers.js";
import ProductsService from "../service/productService.js";
import fakeProducts from "../data/fakeData.js";

const Products = fakeProducts();

const productService = new ProductsService(Products);
const ProductControllers = new ProductsControllers(productService);

const router = Router();


router.get("/", (req, res) => {
  res.render("index", { title: "Hey", message: "Hello there!" });
});

router.get("/products", (req, res) => {
  const filter = req.query.filter as string;
  const data = ProductControllers.getProducts(req);

  res.render("products", {
    title: filter ? `Filtered by: ${filter}` : "All Products",
    products: data,
    filter: filter || "",
  });
});

router.get("/product/:id", (req, res) => {
  const IdProduct = ProductControllers.findProductBYid(req);
  res.render("product", { products: IdProduct });
});
router.get("/addProduct", (req, res) => {
  res.render("addNewProduct");
});
router.post("/addProduct", (req, res) => {
  const result = ProductControllers.AddProduct(req);
  console.log(result);
  res.redirect("/api/products");
});

router.get("/editProduct/:id", (req, res) => {
  const dataEdit = ProductControllers.editProduct(req);
  res.render("editProduct", { product: dataEdit });
});

router.patch("/product/:id", (req, res) => {
  ProductControllers.editProduct(req);
  res.redirect("/api/products");
});
router.delete("/product/:id", (req, res) => {
  const result = ProductControllers.deleteProduct(req);
  res.send(result);
});

export default router;
