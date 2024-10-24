// client/src/App.js
import React, { useState, useEffect } from "react";
import SearchForm from "../../components/SearchForm";

function Home() {
  const [results, setResults] = useState(null);
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
    const { destination, checkin /*checkout*/ } = formData;

    const response = await fetch(
      `https://api.aviationstack.com/v1/flights?access_key=2315abae42923844604b1cafb03c9057&date=${checkin}&destination=${destination}`
    );

    if (!response.ok) {
      throw new Error("Error al buscar vuelos");
    }

    const data = await response.json();
    setResults(data.data);
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

        {results && results.length > 0 && (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((flight) => (
              <div
                key={flight.flight_number}
                className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold">
                  {flight.flight_number}
                </h3>
                <p className="text-gray-600">
                  Origen: {flight.departure.airport}
                </p>
                <p className="text-gray-600">
                  Destino: {flight.arrival.airport}
                </p>
                <p className="text-gray-600">
                  Salida:{" "}
                  {new Date(flight.departure.estimated).toLocaleString()}
                </p>
                <p className="text-gray-600">
                  Llegada: {new Date(flight.arrival.estimated).toLocaleString()}
                </p>
                <p className="text-gray-600">
                  Aerolínea: {flight.airline.name}
                </p>
                <p
                  className={`text-gray-600 ${
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
      </main>
    </div>
  );
}

export default Home;
