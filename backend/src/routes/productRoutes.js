const { Router } = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const authenticate = require("../middleware/auth");

const router = Router();

router.post("/", authenticate, createProduct); // Solo usuarios autenticados pueden crear
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", authenticate, updateProduct); // Solo autenticados pueden actualizar
router.delete("/:id", authenticate, deleteProduct); // Solo autenticados pueden eliminar

module.exports = router;
