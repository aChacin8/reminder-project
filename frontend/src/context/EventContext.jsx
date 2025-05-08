import { createContext, useState, useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext"; // Importa el hook useAuth para obtener el token de autenticación
const API_URL = import.meta.env.VITE_API_URL; // URL de la API desde el archivo .env
const EventContext = createContext(); 

const EventProvider = ({children}) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuthContext(); // Obtiene el token de autenticación usando el hook useAuth

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                if (!token) {
                    throw new Error('Token no proporcionado');
                }
    
                const response = await fetch(`${API_URL}/taskly/events`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Error al obtener los eventos');
                }
    
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchEvents();
    }, [token]);
    

    const data = {
        events,
        setEvents,
        loading,
    };

    return (
        <EventContext.Provider value={data}>
            {children}
        </EventContext.Provider>
    );
};

export { EventContext, EventProvider };
