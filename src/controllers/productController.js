const { Product } = require("../db");

// Crear producto/servicio
const createProduct = async (req, res) => {
  try {
    const { name, description, price, type, available } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      type,
      available,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener por id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "No encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, type, available } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "No encontrado" });
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (type) product.type = type;
    if (available !== undefined) product.available = available;
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "No encontrado" });
    await product.destroy();
    res.json({ message: "Eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
