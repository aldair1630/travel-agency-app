const { FlightCache } = require("../db");
const axios = require("axios");
const { findIataByCityOrCountry } = require("../utils/airports");

const buildCacheWhere = ({ dep_iata, arr_iata, date }) => {
  const where = {};
  if (dep_iata) where.dep_iata = dep_iata;
  if (arr_iata) where.arr_iata = arr_iata;
  if (date) where.date = date;
  return where;
};

const getFlights = async (req, res) => {
  try {
    let {
      dep_iata,
      arr_iata,
      dep_city,
      arr_city,
      dep_country,
      arr_country,
      date,
      limit = 10,
    } = req.query;

    // Traduce ciudad/país a IATA si es necesario
    if (!dep_iata && (dep_city || dep_country)) {
      dep_iata = findIataByCityOrCountry({
        city: dep_city,
        country: dep_country,
      });
    }
    if (!arr_iata && (arr_city || arr_country)) {
      arr_iata = findIataByCityOrCountry({
        city: arr_city,
        country: arr_country,
      });
    }

    // Si no se pudo traducir, devuelve error
    if ((dep_city || dep_country) && !dep_iata) {
      return res
        .status(400)
        .json({ error: "No se encontró código IATA para el origen." });
    }
    if ((arr_city || arr_country) && !arr_iata) {
      return res
        .status(400)
        .json({ error: "No se encontró código IATA para el destino." });
    }

    // Busca en caché solo con los campos definidos
    const cacheWhere = buildCacheWhere({ dep_iata, arr_iata, date });
    const cached = await FlightCache.findOne({ where: cacheWhere });

    if (cached) {
      const now = new Date();
      const createdAt = new Date(cached.createdAt);
      const diffHours = (now - createdAt) / (1000 * 60 * 60);
      if (diffHours < 12) {
        // Devuelve el caché si no ha expirado
        return res.status(200).json(cached.data);
      } else {
        // Si expiró, borra el caché viejo
        await cached.destroy();
      }
    }

    // Si no hay caché válido, consulta la API externa
    const params = {
      access_key: process.env.AVIATIONSTACK_KEY,
      limit: Number(limit) || 10,
    };
    if (dep_iata) params.dep_iata = dep_iata;
    if (arr_iata) params.arr_iata = arr_iata;
    if (date) params.flight_date = date;

    const response = await axios.get(
      "https://api.aviationstack.com/v1/flights",
      { params }
    );

    // Guarda el resultado en caché
    await FlightCache.create({
      dep_iata,
      arr_iata,
      date: date || null,
      data: response.data,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Error al obtener vuelos:",
      error?.response?.data || error.message
    );
    res.status(500).json({ error: "Error al obtener datos de vuelo" });
  }
};

module.exports = { getFlights };
