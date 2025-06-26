import React, { useState, useEffect } from "react";
import SearchForm from "../../components/SearchForm";
import { ClipLoader } from "react-spinners";
import { useUserPlans } from "../../context/UserPlansContext";

function Home() {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // Nuevo estado

  const { addFlight, selectedFlights } = useUserPlans();

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const response = await fetch("http://localhost:3001/destinos");
        const data = await response.json();
        setDestinos(data);
      } catch (error) {
        console.error("Error fetching destinos:", error);
      }
    };

    fetchDestinos();
  }, []);

  const handleSearch = async ({ origin, destination }) => {
    setResults([]);
    setFilteredResults([]);
    setLoading(true);
    setHasSearched(true); // Marcar que se hizo una búsqueda
    try {
      let params = [];
      if (origin) params.push(`dep_city=${encodeURIComponent(origin)}`);
      if (destination)
        params.push(`arr_city=${encodeURIComponent(destination)}`);
      const url = `http://localhost:3001/vuelos?${params.join("&")}`;

      const response = await fetch(url);
      if (!response.ok) {
        setResults([]);
        setFilteredResults([]);
        setLoading(false);
        return;
      }
      const data = await response.json();
      setResults(data.data || []);
      setFilteredResults(data.data || []);
    } catch (error) {
      console.error("Error buscando vuelos:", error);
      setResults([]);
      setFilteredResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDateFilter = (date) => {
    if (!date) {
      setFilteredResults(results);
      return;
    }
    const filtrados = results.filter(
      (flight) =>
        flight.departure.scheduled &&
        flight.departure.scheduled.startsWith(date)
    );
    setFilteredResults(filtrados);
  };

  const traducirEstado = (estado) => {
    switch (estado) {
      case "scheduled":
        return "Programado";
      case "active":
        return "En vuelo";
      case "landed":
        return "Aterrizado";
      case "cancelled":
        return "Cancelado";
      case "incident":
        return "Incidente";
      case "diverted":
        return "Desviado";
      default:
        return estado;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-500 text-white py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Explora el Mundo con Nosotros</h1>
          <p className="text-lg mt-2">
            Encuentra los mejores destinos y ofertas para tu próximo viaje
          </p>
        </div>
      </header>
      <main className="container mx-auto py-10">
        <div className="bg-white shadow-md rounded-lg p-6">
          <SearchForm
            onSearch={handleSearch}
            onDateFilter={handleDateFilter}
            hasResults={results.length > 0}
            destinos={destinos}
          />
        </div>

        {loading && (
          <div className="flex justify-center items-center mt-10">
            <ClipLoader color="#2563eb" size={60} />
          </div>
        )}

        {!loading && !hasSearched && (
          <p className="text-center text-gray-400 mt-8">
            Haz una búsqueda para obtener resultados.
          </p>
        )}

        {!loading && hasSearched && filteredResults.length > 0 && (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((flight) => (
              <div
                key={`${flight.flight.iata}-${flight.departure?.scheduled}`}
                className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold">
                  Vuelo {flight.flight.number || flight.flight.iata}
                </h3>
                <p className="text-gray-600">
                  Origen: {flight.departure.airport} ({flight.departure.iata})
                </p>
                <p className="text-gray-600">
                  Destino: {flight.arrival.airport} ({flight.arrival.iata})
                </p>
                <p className="text-gray-600">
                  Salida:{" "}
                  {new Date(
                    flight.departure.estimated || flight.departure.scheduled
                  ).toLocaleString()}
                </p>
                <p className="text-gray-600">
                  Llegada:{" "}
                  {new Date(
                    flight.arrival.estimated || flight.arrival.scheduled
                  ).toLocaleString()}
                </p>
                <p className="text-gray-600">
                  Aerolínea: {flight.airline.name || "Desconocida"}
                </p>
                <p
                  className={`${
                    flight.flight_status === "active"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  Estado: {traducirEstado(flight.flight_status)}
                </p>
                <button
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={() => addFlight(flight)}
                  disabled={selectedFlights.some(
                    (f) =>
                      f.flight.iata === flight.flight.iata &&
                      f.departure.scheduled === flight.departure.scheduled
                  )}
                >
                  {selectedFlights.some(
                    (f) =>
                      f.flight.iata === flight.flight.iata &&
                      f.departure.scheduled === flight.departure.scheduled
                  )
                    ? "Ya agregado"
                    : "Agregar a mis vuelos"}
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading &&
          hasSearched &&
          filteredResults.length === 0 &&
          results.length > 0 && (
            <p className="text-center text-gray-500 mt-8">
              No se encontraron vuelos para esa fecha.
            </p>
          )}

        {!loading && hasSearched && results.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No se encontraron vuelos para el origen y/o destino consultados.
            <br />
            Por favor, verifica los datos ingresados e intenta nuevamente.
          </p>
        )}
      </main>
    </div>
  );
}

export default Home;
