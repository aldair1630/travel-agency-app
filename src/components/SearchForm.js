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
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "https://countriesnow.space/api/v0.1/countries/population/cities"
        );

        const cityList = response.data.data.map((city) => ({
          name: city.city,
          country: city.country,
        }));

        cityList.sort((a, b) => a.name.localeCompare(b.name));
        setCities(cityList);
      } catch (err) {
        console.error(err);
        setError("Error al cargar ciudades.");
      }
    };

    fetchCities();
  }, []);

  const handleCityInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setFormData({ ...formData, destination: e.target.value });

    if (query) {
      const filtered = cities.filter((city) =>
        city.name.toLowerCase().includes(query)
      );
      setFilteredCities(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredCities([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (cityName) => {
    setFormData({ ...formData, destination: cityName });
    setFilteredCities([]);
    setShowSuggestions(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      setError("La fecha de entrada debe ser anterior a la de salida.");
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
      setError("Error al buscar disponibilidad. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 relative">
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">
          Ciudad destino:
        </label>
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleCityInputChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe el nombre de la ciudad"
          autoComplete="off"
        />
        {showSuggestions && filteredCities.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 mt-20 max-h-48 overflow-y-auto rounded-md shadow-lg w-full">
            {filteredCities.map((city, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(city.name)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {city.name}, {city.country}
              </li>
            ))}
          </ul>
        )}
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
