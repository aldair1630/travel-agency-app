const { Router } = require("express");
const {
  createReservation,
  getUserReservations,
  getAllReservations,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = Router();

// Crear una reserva (usuario autenticado)
router.post("/", authMiddleware, createReservation);

// Obtener reservas del usuario autenticado
router.get("/mine", authMiddleware, getUserReservations);

// Obtener todas las reservas (solo admin, puedes agregar validación extra si quieres)
router.get("/", authMiddleware, getAllReservations);

// Actualizar una reserva (usuario autenticado)
router.put("/:id", authMiddleware, updateReservation);

// Eliminar una reserva (usuario autenticado)
router.delete("/:id", authMiddleware, deleteReservation);

module.exports = router;
