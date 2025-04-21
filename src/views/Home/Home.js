// client/src/App.js
import React, { useState, useEffect } from "react";
import SearchForm from "../../components/SearchForm";

function Home() {
  const [results, setResults] = useState([]);
  const [destinos, setDestinos] = useState([]);

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const response = await fetch("http://localhost:5000/destinos");
        const data = await response.json();
        setDestinos(data);
      } catch (error) {
        console.error("Error fetching destinos:", error);
      }
    };

    fetchDestinos();
  }, []);

  const handleSearch = async (formData) => {
    const { destination, checkin } = formData;

    try {
      const response = await fetch(
        `https://api.aviationstack.com/v1/flights?access_key=2315abae42923844604b1cafb03c9057&date=${checkin}`
      );

      if (!response.ok) {
        throw new Error("Error al buscar vuelos");
      }

      const data = await response.json();

      // Normalizar la ciudad seleccionada en el formulario
      const ciudadNormalizada = destination.toLowerCase().trim();

      // Filtrar vuelos por ciudad (origen o destino)
      const vuelosFiltrados = data.data.filter((flight) => {
        // Normalizar los nombres de las ciudades de origen y destino
        const ciudadOrigen = flight.departure?.airport?.toLowerCase() || "";
        const ciudadDestino = flight.arrival?.airport?.toLowerCase() || "";

        // Verificar coincidencia (puede ser origen o destino)
        return (
          ciudadOrigen.includes(ciudadNormalizada) ||
          ciudadDestino.includes(ciudadNormalizada)
        );
      });

      setResults(vuelosFiltrados);
    } catch (error) {
      console.error("Error buscando vuelos:", error);
      setResults([]);
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
          <SearchForm onSearch={handleSearch} destinos={destinos} />
        </div>

        {results.length > 0 && (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((flight) => (
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
                  Estado: {flight.flight_status}
                </p>
              </div>
            ))}
          </div>
        )}

        {results.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No se encontraron vuelos para esa ciudad y fecha.
          </p>
        )}
      </main>
    </div>
  );
}

export default Home;
