import { Card, Button } from 'react-bootstrap';
import '@/styles/Calendar.scss';
import { useEffect } from 'react';
import { useEventContext } from '@/hooks/useEventContext';
import { useAuthContext } from '@/hooks/useAuthContext';
import UpdateEventsComponent from './UpdateEventsComponent';
import DeleteEventsComponent from './DeleteEventsComponent';
const API_URL = import.meta.env.VITE_API_URL; // URL de la API desde el archivo .env

const EventsComponent = () => {
    const { events, setEvents, setSelectedEvent, setShowModal} = useEventContext();
    const { token } = useAuthContext();


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${API_URL}/taskly/events`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                const result = await response.json();
                setEvents(result);
            } catch (error) {
                console.error('Error al llamar a los eventos:', error);
            }
        };
        fetchEvents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setEvents]); // Se asegura de que el efecto se ejecute solo una vez al montar el componente  

        const handleEdit = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
        }

    return (
        <>
            <Card className='eventCard'>
                <Card.Body>
                    <Card.Title className='eventCard__title'>Mis Eventos</Card.Title>
                    <Card.Text className='eventCard__text'>
                        Aquí puedes ver todos tus eventos programados.
                    </Card.Text>
                    <ul className='eventCard__list'>
                        {Array.isArray(events) && events.length > 0 ? (
                            events.map((event) => (
                                <li key={event.id_events} className='mb-3' style={{ listStyle: 'none' }}>
                                    <Card>
                                        <Card.Body className='eventCard__body'> 
                                            <Card.Title>{event.event_name}</Card.Title>
                                            <Card.Text>
                                                {event.event_description}
                                                <br />
                                                <strong>Inicio:</strong> {new Date(event.event_start_date).toLocaleString()}
                                                <br />
                                                <strong>Fin:</strong> {new Date(event.event_end_date).toLocaleString()}
                                            </Card.Text>
                                        </Card.Body>
                                        <div className='eventCard__button'>
                                            <Button variant="primary" className='eventCard__buttonUpdate' onClick={()=> handleEdit (event)}>Editar</Button>
                                            <DeleteEventsComponent event={event} />
                                        </div>
                                    </Card>
                                </li>
                            ))
                        ) : (
                            <li style={{ listStyle: 'none' }}>
                                <Card className="text-center text-muted">
                                    <Card.Body>
                                        <Card.Text>No hay eventos programados.</Card.Text>
                                    </Card.Body>
                                </Card>
                            </li>
                        )}
                    </ul>
                </Card.Body>
            </Card>
            <UpdateEventsComponent/>
        </>
        
        
    );
}

export default EventsComponent;
