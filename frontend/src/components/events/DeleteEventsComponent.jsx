import { Button } from 'react-bootstrap';
import { useEventContext } from '@/hooks/useEventContext';
import { useAuthContext } from '@/hooks/useAuthContext';

const API_URL = import.meta.env.VITE_API_URL; // URL de la API desde el archivo .env

const DeleteEventsComponent = ({event}) => {
    const { events, setEvents  } = useEventContext();
    const { token } = useAuthContext();

    const handleDelete = async () => {
        const confirmDelete= window.confirm('¿Estás seguro de que deseas eliminar este evento?');
        if(!confirmDelete) return;

        try {
            const response = await fetch(`${API_URL}/taskly/events/${event.id_events}/hard`, {
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                    }
                });

            if (!response.ok) {
                throw new Error('Error al eliminar el evento');
            }

        setEvents(events.filter((e) => e.id_events !== event.id_events));

        } catch (error) {
            console.error('Error al eliminar el evento:', error);
        }
    }

    return (
        <Button variant="danger" className='eventCard__buttonDelete' onClick={handleDelete}>Elimar</Button>
    );
}

export default DeleteEventsComponent;