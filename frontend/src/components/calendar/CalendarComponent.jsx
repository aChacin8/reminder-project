
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect } from 'react';
import { useEventContext } from '@/hooks/useEventContext';
import { useAuthContext } from '@/hooks/useAuthContext'; // Importa el hook useAuth para obtener el token de autenticación
import '@/styles/Calendar.scss';


const API_URL = import.meta.env.VITE_API_URL; // URL de la API desde el archivo .env

const CalendarComponent = () => {
    const { events, setEvents } = useEventContext([]); //Obtenemos el contexto de los eventos
    const { token, isAuth, userPayload } = useAuthContext(); // Obtiene el token de autenticación usando el hook useAuth

    useEffect(() => {

        if (!isAuth || !userPayload || !token) {
            return <p>Cargando calendario...</p>;
        }
        const getEvents = async () => {
            try {
                const response = await fetch(`${API_URL}/taskly/events`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}` //Para verificar el JWT
                    }
                });
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    const result = await response.json();
                    setEvents(result);
                } else {
                    console.error('La respuesta no es un JSON válido');
                }
            } catch (error) {
                console.log("Error al obtener eventos", error);
            }
        }
        if (token) {
            getEvents(); //Llama a la funcion para obtener los eventos
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]); //Se ejecuta cada vez que cambia el evento


    return (
        <div className='calendar'>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} //llamamos los plugins del calendario, para realizar las operaciones necesarias
                initialView={'dayGridMonth'} //Esta es la visualización inicial de la pagina (por mes).
                headerToolbar={{
                    start: 'prev,today,next', //Se asignan los botones de movimiento por meses del calendario
                    center: 'title', //El mes en el que nos encontramos dentro del calendario
                    end: 'dayGridMonth,timeGridWeek,timeGridDay' //Se asignan los botones de visualizacion, por "Mes","Semana" y "Dia"
                }}
                events={Array.isArray(events) ? events.map(event => {
                    const start = new Date(event.event_start_date);
                    const end = new Date(event.event_end_date);

                    return {
                        title: event.event_name,
                        description: event.event_description,
                        start: isNaN(start.getTime()) ? null : start.toISOString(),
                        end: isNaN(end.getTime()) ? null : end.toISOString(),
                        color: event.color
                    };
                }) : []} //Se asignan los eventos al calendario, se verifica que sea un array y se asignan los valores necesarios
            />
        </div>
    );
};

export default CalendarComponent;

