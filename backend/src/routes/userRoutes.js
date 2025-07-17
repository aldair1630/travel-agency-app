const { Router } = require("express");
const {
  createUser,
  updateUser,
  getUserProfile,
  getUsers,
  deleteUser,
} = require("../controllers/userController");

const router = Router();

router.post("/", createUser); // Crear usuario
router.get("/", getUsers); // Obtener todos los usuarios
router.get("/:id", getUserProfile); // Obtener usuario por id
router.put("/:id", updateUser); // Actualizar usuario
router.delete("/:id", deleteUser); // Eliminar usuario

module.exports = router;
