import { Modal, Button, Form } from 'react-bootstrap';
import { useEventContext } from '@/hooks/useEventContext';
import { useAuthContext } from '@/hooks/useAuthContext';

const API_URL = import.meta.env.VITE_API_URL; // URL de la API desde el archivo .env

const UpdateEventsComponent = () => {

    const { setEvents, selectedEvent, setSelectedEvent, showModal, setShowModal } = useEventContext();
    const { token } = useAuthContext();

    const toUTC = (localDateString) => {
        const localDate = new Date(localDateString);
        return localDate.toISOString();
    };

    const updateEvents = async (data) => {
        try {
            const dataToSend = {
                ...data,
                event_start_date: toUTC(data.event_start_date),
                event_end_date: toUTC(data.event_end_date)
            };
            const response = await fetch(`${API_URL}/taskly/events/${data.id_events}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(dataToSend)
            });
            const result = await response.json();
            setEvents(result);
            setShowModal(false);
            alert('Evento actualizado correctamente');
            window.location.reload(); // Recargar la página para reflejar los cambios
        } catch (error) {
            console.error('Error actualizar eventos:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value
        }));
    }

        const toLocalDatetime = (utcDate) => {
            const date = new Date(utcDate);
            const offset = date.getTimezoneOffset();
            const localDate = new Date(date.getTime() - offset * 60000);
            return localDate.toISOString().slice(0, 16);
        };

    return (
        <Modal style={{ marginTop: '8rem' }} show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Actualizar Evento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedEvent && (
                    <Form>
                        <Form.Group controlId="eventName">
                            <Form.Label>Titulo:</Form.Label>
                            <Form.Control
                                type='text'
                                name='event_name'
                                value={selectedEvent.event_name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId='eventDescription'>
                            <Form.Label>Descripción:</Form.Label>
                            <Form.Control
                                type='text'
                                name='event_description'
                                value={selectedEvent.event_description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId='eventStartDate'>
                            <Form.Label>Fecha de Inicio:</Form.Label>
                            <Form.Control
                                type='datetime-local'
                                name='event_start_date'
                                value={toLocalDatetime(selectedEvent.event_start_date)}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId='eventStartDate'>
                            <Form.Label>Fecha de Fin:</Form.Label>
                            <Form.Control
                                type='datetime-local'
                                name='event_end_date'
                                value={toLocalDatetime(selectedEvent.event_end_date)}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Color</Form.Label>
                        <Form.Control
                            type='color'
                            name='color'
                            value={selectedEvent.color}
                            onChange={handleChange}
                />
                    </Form.Group>
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={() => updateEvents(selectedEvent)}>
                    Actualizar
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default UpdateEventsComponent;