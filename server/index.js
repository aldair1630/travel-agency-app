const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const axios = require("axios"); // Para hacer solicitudes HTTP

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: "tu_usuario",
  host: "localhost",
  database: "agencia_viajes",
  password: "tu_contraseña",
  port: 5432,
});

// Ruta para buscar viajes
app.post("/search", async (req, res) => {
  const { destination, checkin, checkout, type } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM viajes WHERE destino = $1 AND tipo = $2",
      [destination, type]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en la búsqueda" });
  }
});

// Nueva ruta para obtener destinos desde la API de RestCountries
app.get("/destinos", async (req, res) => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    const countries = response.data.map((country) => ({
      name: country.name.common,
      region: country.region,
    }));
    res.json(countries);
  } catch (error) {
    console.error("Error al obtener los destinos", error);
    res.status(500).json({ error: "Error al obtener los destinos" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
