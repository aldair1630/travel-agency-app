import React, { createContext, useContext, useState, useEffect } from "react";

const UserPlansContext = createContext();

export const useUserPlans = () => useContext(UserPlansContext);

export const UserPlansProvider = ({ children }) => {
  const [selectedFlights, setSelectedFlights] = useState(() => {
    const stored = localStorage.getItem("selectedFlights");
    return stored ? JSON.parse(stored) : [];
  });

  const [todoList, setTodoList] = useState(() => {
    const stored = localStorage.getItem("todoList");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("selectedFlights", JSON.stringify(selectedFlights));
  }, [selectedFlights]);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const addFlight = (flight) => {
    setSelectedFlights((prev) => {
      if (
        prev.some(
          (f) =>
            f.flight.iata === flight.flight.iata &&
            f.departure.scheduled === flight.departure.scheduled
        )
      ) {
        return prev; // Evita duplicados
      }
      return [...prev, flight];
    });
  };

  const removeFlight = (iata, scheduled) => {
    setSelectedFlights((prev) =>
      prev.filter(
        (f) => !(f.flight.iata === iata && f.departure.scheduled === scheduled)
      )
    );
  };

  const addTask = (task) => {
    setTodoList((prev) => [...prev, task]);
  };

  const removeTask = (index) => {
    setTodoList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <UserPlansContext.Provider
      value={{
        selectedFlights,
        addFlight,
        removeFlight,
        todoList,
        addTask,
        removeTask,
      }}
    >
      {children}
    </UserPlansContext.Provider>
  );
};
