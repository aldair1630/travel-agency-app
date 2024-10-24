// client/src/App.js
import React, { useState, useEffect } from "react";
import SearchForm from "../../components/SearchForm";

function Home() {
  const [results, setResults] = useState(null);
  const [destinos, setDestinos] = useState([]);

  // Obtener los destinos al cargar la página
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
    const response = await fetch("http://localhost:5000/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setResults(data);
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
        {/* Formulario de búsqueda */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <SearchForm onSearch={handleSearch} destinos={destinos} />
        </div>

        {/* Resultados de la búsqueda */}
        {results && (
          <div className="mt-10 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold">Resultados</h2>
            <pre className="mt-4 text-gray-700">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
