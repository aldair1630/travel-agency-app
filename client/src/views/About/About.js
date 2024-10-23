import React, { useState } from "react";

function About() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-3xl mt-4 text-center">Sobre Nosotros</h2>
      <div className="max-w-4xl w-full">
        <p className="text-lg text-center mt-4 px-4 break-words">
          Somos una agencia de viajes dedicada a ofrecer experiencias únicas y
          memorables. Con años de experiencia en la industria, nuestro objetivo
          es ayudar a nuestros clientes a explorar el mundo y disfrutar de
          aventuras inolvidables. Desde escapadas románticas hasta viajes
          familiares, tenemos algo para todos. Creemos que cada viaje es una
          oportunidad para crear recuerdos duraderos y conectar con diferentes
          culturas.
        </p>
        <p className="text-lg text-center mt-4 px-4 break-words">
          Nuestro equipo de expertos está siempre disponible para ofrecer
          asesoramiento personalizado y recomendaciones adaptadas a tus
          necesidades. Nos apasiona viajar y queremos compartir esa pasión
          contigo. Ya sea que estés buscando un destino exótico o una escapada
          de fin de semana, estamos aquí para hacer que tu viaje sea lo más
          fácil y agradable posible.
        </p>
      </div>
      <h3 className="text-2xl mt-8 mb-4 text-center">Contáctanos</h3>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
        <textarea
          name="message"
          placeholder="Tu Mensaje"
          value={formData.message}
          onChange={handleChange}
          className="border p-2 mb-4 w-full h-32 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-500 transition duration-200"
        >
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
}

export default About;
