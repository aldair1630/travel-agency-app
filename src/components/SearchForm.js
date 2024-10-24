// client/src/components/SearchForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    destination: "",
    checkin: "",
    checkout: "",
    type: "flight",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [destinos, setDestinos] = useState([]);

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countries = response.data.map((country) => ({
          name: country.name.common,
          region: country.region,
        }));

        // Ordenar los países alfabéticamente
        countries.sort((a, b) => a.name.localeCompare(b.name));

        setDestinos(countries);
      } catch (err) {
        setError("Error al cargar destinos.");
      }
    };

    fetchDestinos();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.destination) {
      setError("Por favor, selecciona un destino.");
      return false;
    }
    if (!formData.checkin || !formData.checkout) {
      setError("Por favor, selecciona las fechas de entrada y salida.");
      return false;
    }
    if (new Date(formData.checkin) >= new Date(formData.checkout)) {
      setError("La fecha de entrada debe ser anterior a la fecha de salida.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSearch(formData);
    } catch (err) {
      setError("Error al buscar disponibilidad. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">Destino:</label>
        <select
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecciona un destino</option>
          {destinos.map((destino, index) => (
            <option key={index} value={destino.name}>
              {destino.name} - {destino.region}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">
          Fecha de entrada:
        </label>
        <input
          type="date"
          name="checkin"
          value={formData.checkin}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">
          Fecha de salida:
        </label>
        <input
          type="date"
          name="checkout"
          value={formData.checkout}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">
          Tipo de viaje:
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="flight">Vuelo</option>
          <option value="hotel">Hotel</option>
          <option value="package">Paquete completo</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-colors duration-300"
        disabled={loading}
      >
        {loading ? "Buscando..." : "Buscar"}
      </button>
    </form>
  );
};

export default SearchForm;
