
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
import '@/styles/Calendar.scss';
import { useContext } from 'react';
import { EventContext } from '@/context/EventContext';

const CalendarComponent = () => {

    const {events, loading} = useContext(EventContext);
    
    if (loading){
        return <p>Cargando eventos...</p>
    }

    return (
        <div className='calendar'>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} //llamamos los plugins del calendario, para realizar las operaciones necesarias
                initialView={'dayGridMonth'} //Esta es la visualización inicial de la pagina (por mes).
                headerToolbar= {{
                    start: 'prev,today,next', //Se asignan los botones de movimiento por meses del calendario
                    center: 'title', //El mes en el que nos encontramos dentro del calendario
                    end: 'dayGridMonth,timeGridWeek,timeGridDay' //Se asignan los botones de visualizacion, por "Mes","Semana" y "Dia"
                }}
                events={events.map(event=>(
                    {
                        title: event.name,
                        description: event.description,
                        start: event.start_date,
                        end: event.end_date,
                        color: event.color
                    }
                ))}
            />
        </div>
    );
};

export default CalendarComponent;
