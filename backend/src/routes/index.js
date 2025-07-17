const { Router } = require("express");
const destinationRoutes = require("./destinationRoutes");
const userRoutes = require("./userRoutes");
const reservationRoutes = require("./reservationRoutes");
const flightRoutes = require("./flightRoutes");
const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");

const router = Router();

router.use("/destinos", destinationRoutes);
router.use("/users", userRoutes);
router.use("/reservas", reservationRoutes);
router.use("/vuelos", flightRoutes);
router.use("/auth", authRoutes);
router.use("/productos", productRoutes);

module.exports = router;
