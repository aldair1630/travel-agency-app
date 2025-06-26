import React, { useEffect, useState } from "react";
import axios from "axios";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3; /* Light grey */
          border-top: 8px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

const Destinations = () => {
  const [destinos, setDestinos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Estado para cargar

  const fetchDestinos = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const countries = response.data.map((country) => ({
        name: country.name.common,
        region: country.region,
        flag: country.flags.svg,
      }));

      countries.sort((a, b) => a.name.localeCompare(b.name));
      setDestinos(countries);
    } catch (err) {
      setError("Error al cargar destinos.");
    } finally {
      setLoading(false); // Cambiar el estado de carga
    }
  };

  useEffect(() => {
    fetchDestinos();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-3xl mb-4 text-center">Destinos</h2>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? ( // Mostrar el spinner mientras se carga
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinos.map((destino) => (
            <div
              key={destino.name}
              className="border rounded p-4 shadow flex flex-col items-center bg-gray-200"
            >
              <img
                src={destino.flag}
                alt={`Bandera de ${destino.name}`}
                className="w-full h-32 object-contain mb-2"
              />
              <h3 className="text-xl text-center">{destino.name}</h3>
              <p className="text-gray-600 text-center">{destino.region}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Destinations;
