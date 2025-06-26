const fs = require("fs");
const parse = require("csv-parse/sync").parse;
const axios = require("axios");

const airports = [
  { city: "Madrid", country: "España", iata: "MAD" },
  { city: "Barcelona", country: "España", iata: "BCN" },
  { city: "Sevilla", country: "España", iata: "SVQ" },
  { city: "Valencia", country: "España", iata: "VLC" },
  { city: "Buenos Aires", country: "Argentina", iata: "EZE" },
  { city: "Córdoba", country: "Argentina", iata: "COR" },
  { city: "Rosario", country: "Argentina", iata: "ROS" },
  { city: "Ciudad de México", country: "México", iata: "MEX" },
  { city: "Cancún", country: "México", iata: "CUN" },
  { city: "Guadalajara", country: "México", iata: "GDL" },
  { city: "Miami", country: "Estados Unidos", iata: "MIA" },
  { city: "Nueva York", country: "Estados Unidos", iata: "JFK" },
  { city: "Los Ángeles", country: "Estados Unidos", iata: "LAX" },
  { city: "Chicago", country: "Estados Unidos", iata: "ORD" },
  { city: "Houston", country: "Estados Unidos", iata: "IAH" },
  { city: "Londres", country: "Reino Unido", iata: "LHR" },
  { city: "Manchester", country: "Reino Unido", iata: "MAN" },
  { city: "París", country: "Francia", iata: "CDG" },
  { city: "Marsella", country: "Francia", iata: "MRS" },
  { city: "Roma", country: "Italia", iata: "FCO" },
  { city: "Milán", country: "Italia", iata: "MXP" },
  { city: "Frankfurt", country: "Alemania", iata: "FRA" },
  { city: "Berlín", country: "Alemania", iata: "BER" },
  { city: "Ámsterdam", country: "Países Bajos", iata: "AMS" },
  { city: "Lisboa", country: "Portugal", iata: "LIS" },
  { city: "Oporto", country: "Portugal", iata: "OPO" },
  { city: "Santiago", country: "Chile", iata: "SCL" },
  { city: "Lima", country: "Perú", iata: "LIM" },
  { city: "Bogotá", country: "Colombia", iata: "BOG" },
  { city: "Medellín", country: "Colombia", iata: "MDE" },
  { city: "Caracas", country: "Venezuela", iata: "CCS" },
  { city: "Quito", country: "Ecuador", iata: "UIO" },
  { city: "Guayaquil", country: "Ecuador", iata: "GYE" },
  { city: "Montevideo", country: "Uruguay", iata: "MVD" },
  { city: "Asunción", country: "Paraguay", iata: "ASU" },
  { city: "San Pablo", country: "Brasil", iata: "GRU" },
  { city: "Río de Janeiro", country: "Brasil", iata: "GIG" },
  { city: "Toronto", country: "Canadá", iata: "YYZ" },
  { city: "Vancouver", country: "Canadá", iata: "YVR" },
  { city: "Montreal", country: "Canadá", iata: "YUL" },
  { city: "Tokio", country: "Japón", iata: "NRT" },
  { city: "Osaka", country: "Japón", iata: "KIX" },
  { city: "Pekín", country: "China", iata: "PEK" },
  { city: "Shanghái", country: "China", iata: "PVG" },
  { city: "Dubái", country: "Emiratos Árabes Unidos", iata: "DXB" },
  { city: "Estambul", country: "Turquía", iata: "IST" },
  { city: "El Cairo", country: "Egipto", iata: "CAI" },
  { city: "Johannesburgo", country: "Sudáfrica", iata: "JNB" },
  { city: "Sídney", country: "Australia", iata: "SYD" },
  { city: "Melbourne", country: "Australia", iata: "MEL" },
  { city: "Auckland", country: "Nueva Zelanda", iata: "AKL" },
  // Puedes seguir agregando más ciudades y países aquí
];

function findIataByCityOrCountry({ city, country }) {
  if (city) {
    const found = airports.find(
      (a) => a.city.toLowerCase() === city.toLowerCase()
    );
    if (found) return found.iata;
  }
  if (country) {
    const found = airports.find(
      (a) => a.country.toLowerCase() === country.toLowerCase()
    );
    if (found) return found.iata;
  }
  return null;
}

module.exports = { findIataByCityOrCountry, airports };
