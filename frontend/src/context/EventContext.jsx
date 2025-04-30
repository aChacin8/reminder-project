import { createContext, useState, useEffect } from "react";

const EventContext = createContext(); 

const EventProvider = ({children}) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch('http://localhost:3000/events', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
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
    }, []);

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
