import { createContext, useState, useEffect, useCallback } from "react";
import { useAuthContext } from "@/hooks/useAuthContext"; // Hook para obtener token

const API_URL = import.meta.env.VITE_API_URL; // URL de la API desde .env

const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { token, isAuth } = useAuthContext();

  // fetchEvents se define con useCallback para evitar recreaciones innecesarias
  const fetchEvents = useCallback(async () => {
    if (!token || !isAuth) return;

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/events`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error al obtener eventos:", data.message || data);
        setEvents([]);
        return;
      }

      // Verificamos que sea un array
      if (Array.isArray(data)) {
        setEvents(data);
      } else {
        console.warn("Los datos obtenidos no son un array:", data);
        setEvents([]);
      }

      console.log("Eventos obtenidos:", data);
    } catch (error) {
      console.error("Error al obtener eventos:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [token, isAuth]);

  // useEffect para obtener eventos al cargar o cuando cambia el token
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const contextData = {
    events,
    setEvents,
    loading,
    showModal,
    setShowModal,
    selectedEvent,
    setSelectedEvent,
    fetchEvents
  };

  return <EventContext.Provider value={contextData}>{children}</EventContext.Provider>;
};

export { EventContext, EventProvider };


