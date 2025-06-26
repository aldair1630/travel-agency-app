import React, { useState } from "react";

const SearchForm = ({ onSearch, onDateFilter, hasResults }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!origin.trim()) {
      setError("Por favor, escribe una ciudad o país de origen.");
      return;
    }
    await onSearch({ origin: origin.trim(), destination: destination.trim() });
    setError("");
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    if (onDateFilter) {
      onDateFilter(e.target.value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">
          Ciudad o país de origen:
        </label>
        <input
          type="text"
          value={origin}
          onChange={e => setOrigin(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
          placeholder="Ejemplo: Madrid, España..."
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">
          Ciudad o país de destino (opcional):
        </label>
        <input
          type="text"
          value={destination}
          onChange={e => setDestination(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
          placeholder="Ejemplo: Buenos Aires, Argentina..."
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">
          Filtrar por fecha de salida:
        </label>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          className="p-2 border border-gray-300 rounded-md"
          disabled={!hasResults}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-colors duration-300"
      >
        Buscar vuelos
      </button>
    </form>
  );
};

export default SearchForm;
