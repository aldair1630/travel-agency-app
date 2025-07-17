const { Destination } = require("../db");

const getAllDestinations = async (req, res) => {
  try {
    const destinos = await Destination.findAll();
    res.json(destinos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDestination = async (req, res) => {
  try {
    const { name, region, description, image } = req.body;
    const destino = await Destination.create({ name, region, description, image });
    res.status(201).json(destino);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const destino = await Destination.findByPk(id);
    if (!destino) return res.status(404).json({ error: "Destino no encontrado" });

    const { name, region, description, image } = req.body;
    destino.name = name || destino.name;
    destino.region = region || destino.region;
    destino.description = description || destino.description;
    destino.image = image || destino.image;

    await destino.save();
    res.json(destino);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const destino = await Destination.findByPk(id);
    if (!destino) return res.status(404).json({ error: "Destino no encontrado" });

    await destino.destroy();
    res.json({ message: "Destino eliminado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllDestinations,
  createDestination,
  updateDestination,
  deleteDestination,
};