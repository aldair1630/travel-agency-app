const { Reservation, User, Destination } = require("../db");

const createReservation = async (req, res) => {
  try {
    const { destinationId, date, people } = req.body;
    const userId = req.user.id;

    // Validar existencia de destino
    const destination = await Destination.findByPk(destinationId);
    if (!destination) return res.status(404).json({ error: "Destino no encontrado" });

    // Validar fecha
    if (!date) return res.status(400).json({ error: "La fecha es obligatoria" });

    const reservation = await Reservation.create({
      userId,
      destinationId,
      date,
      people,
      status: "pendiente",
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserReservations = async (req, res) => {
  try {
    const userId = req.user.id;
    const reservations = await Reservation.findAll({
      where: { userId },
      include: [{ model: Destination }],
      order: [["date", "DESC"]],
    });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllReservations = async (req, res) => {
  try {
    // Solo admin puede ver todas las reservas
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Acceso denegado" });
    }
    const reservations = await Reservation.findAll({
      include: [{ model: User, attributes: ["id", "name", "email"] }, { model: Destination }],
      order: [["date", "DESC"]],
    });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, people, status } = req.body;
    const reservation = await Reservation.findByPk(id);

    if (!reservation) return res.status(404).json({ error: "Reserva no encontrada" });

    // Solo el dueño o admin puede editar
    if (reservation.userId !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ error: "No autorizado" });
    }

    reservation.date = date || reservation.date;
    reservation.people = people || reservation.people;
    reservation.status = status || reservation.status;

    await reservation.save();
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByPk(id);

    if (!reservation) return res.status(404).json({ error: "Reserva no encontrada" });

    // Solo el dueño o admin puede eliminar
    if (reservation.userId !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ error: "No autorizado" });
    }

    await reservation.destroy();
    res.json({ message: "Reserva eliminada" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createReservation,
  getUserReservations,
  getAllReservations,
  updateReservation,
  deleteReservation,
};