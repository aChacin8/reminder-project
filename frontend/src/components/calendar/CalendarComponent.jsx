import FullCalendar from '@fullcalendar/react';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect } from 'react';
import { useEventContext } from '@/hooks/useEventContext';
import { useAuthContext } from '@/hooks/useAuthContext';
import '@/styles/Calendar.scss';

const API_URL = import.meta.env.VITE_API_URL; // URL de la API desde el archivo .env

const CalendarComponent = () => {
  const { events = [], setEvents } = useEventContext(); // Valor por defecto como array
  const { token, isAuth, userPayload } = useAuthContext();

  useEffect(() => {
    if (!isAuth || !userPayload || !token) {
      console.log("Usuario no autenticado o token faltante");
      return;
    }

    const getEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/taskly/events`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const result = await response.json();

          if (Array.isArray(result)) {
            setEvents(result);
          } else {
            console.warn('Eventos recibidos no son un array:', result);
            setEvents([]); // Evita errores en el renderizado
          }
        } else {
          console.error('La respuesta del backend no es JSON válido');
          setEvents([]);
        }
      } catch (error) {
        console.error('Error al obtener eventos del backend:', error);
        setEvents([]);
      }
    };

    getEvents();
  }, [token, isAuth, userPayload, setEvents]);

  return (
    <div className='calendar'>
      <FullCalendar
        locales={[esLocale]}
        locale="es"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={'dayGridMonth'}
        headerToolbar={{
          start: 'prev,today,next',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={Array.isArray(events)
          ? events.map(event => {
              const start = new Date(event.event_start_date);
              const end = new Date(event.event_end_date);

              return {
                title: event.event_name,
                description: event.event_description,
                start: isNaN(start.getTime()) ? null : start.toISOString(),
                end: isNaN(end.getTime()) ? null : end.toISOString(),
                color: event.color || '#3788d8'
              };
            })
          : []}
      />
    </div>
  );
};

export default CalendarComponent;
