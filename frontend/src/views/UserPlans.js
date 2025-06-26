import React, { useState } from "react";
import { useUserPlans } from "../context/UserPlansContext";
import { FaTrashAlt, FaPlaneDeparture, FaClipboardList } from "react-icons/fa";

function UserPlans() {
  const { selectedFlights, removeFlight, todoList, addTask, removeTask } =
    useUserPlans();
  const [newTask, setNewTask] = useState("");

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-blue-700">
          <FaPlaneDeparture className="text-blue-500" /> Mis vuelos
          seleccionados
        </h2>
        {selectedFlights.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-gray-500 text-center">
            No has seleccionado vuelos aún.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedFlights.map((flight, idx) => (
              <div
                key={idx}
                className="bg-white shadow-lg rounded-xl p-6 transform transition-transform hover:scale-105 hover:shadow-2xl duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">
                    Vuelo {flight.flight.number || flight.flight.iata}
                  </h3>
                  <p className="text-gray-700">
                    <span className="font-semibold">Origen:</span>{" "}
                    {flight.departure.airport} ({flight.departure.iata})
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Destino:</span>{" "}
                    {flight.arrival.airport} ({flight.arrival.iata})
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Salida:</span>{" "}
                    {new Date(flight.departure.scheduled).toLocaleString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Llegada:</span>{" "}
                    {new Date(flight.arrival.scheduled).toLocaleString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Aerolínea:</span>{" "}
                    {flight.airline.name || "Desconocida"}
                  </p>
                  <p className="mt-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        flight.flight_status === "active"
                          ? "bg-green-100 text-green-700"
                          : flight.flight_status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      Estado:{" "}
                      {flight.flight_status === "scheduled"
                        ? "Programado"
                        : flight.flight_status === "active"
                        ? "En vuelo"
                        : flight.flight_status === "landed"
                        ? "Aterrizado"
                        : flight.flight_status === "cancelled"
                        ? "Cancelado"
                        : flight.flight_status === "incident"
                        ? "Incidente"
                        : flight.flight_status === "diverted"
                        ? "Desviado"
                        : flight.flight_status}
                    </span>
                  </p>
                </div>
                <button
                  className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                  onClick={() =>
                    removeFlight(flight.flight.iata, flight.departure.scheduled)
                  }
                >
                  <FaTrashAlt /> Eliminar vuelo
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-blue-700">
          <FaClipboardList className="text-blue-500" /> Mi lista de planes /
          To-Do
        </h2>
        <div className="flex mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="border border-blue-300 rounded-l px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Agregar nuevo plan..."
          />
          <button
            onClick={() => {
              if (newTask.trim()) {
                addTask(newTask.trim());
                setNewTask("");
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-r transition-colors duration-200"
          >
            Agregar
          </button>
        </div>
        {todoList.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-gray-500 text-center">
            No tienes planes agregados.
          </div>
        ) : (
          <ul className="space-y-3">
            {todoList.map((task, idx) => (
              <li
                key={idx}
                className="bg-white shadow flex items-center justify-between px-4 py-3 rounded-lg hover:shadow-lg transition-shadow duration-200"
              >
                <span className="text-gray-800">{task}</span>
                <button
                  onClick={() => removeTask(idx)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  title="Eliminar"
                >
                  <FaTrashAlt />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserPlans;
