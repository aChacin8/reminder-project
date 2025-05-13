import { Card, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import '@/styles/Calendar.scss'
import { useEventContext } from '@/hooks/useEventContext';
import { useAuthContext } from '@/hooks/useAuthContext'; // Importa el hook useAuth para obtener el token de autenticación

const API_URL = import.meta.env.VITE_API_URL; // URL de la API desde el archivo .env

const CardCalendarComponent = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { events, setEvents } = useEventContext([]);
    const { token, isAuth, userPayload } = useAuthContext(); // Obtiene el token de autenticación usando el hook useAuth

    const onSubmit = async (data) => {
        if (!isAuth || !userPayload || !token) {
            return <p>Cargando calendario...</p>;
        }
        if (new Date(data['endDate-e']) < new Date(data['startDate-e'])) {
            alert('La fecha de finalización no puede ser anterior a la de inicio.');
            return;
        }
        try {
            const response = await fetch(`${API_URL}/taskly/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` //Para verificar el JWT
                },
                body: JSON.stringify({
                    event_name: data['title-e'],
                    event_description: data['descr-e'],
                    event_start_date: data['startDate-e'],
                    event_end_date: data['endDate-e'],
                    color: data['color-e']
                })  //Se envian los datos al servidor
            });

            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const result = await response.json();
                setEvents([...events, result]); //Actualizar el contexto de los eventos
                alert('Evento creado con éxito');
            } else {
                console.error('La respuesta no es un JSON válido');
            }


        } catch (error) {
            console.log(error);
            alert('Hubo un error al crear el evento');
        }
    }
    return (
        <Card className='cardCalendar'>
            <Card.Body>
                <Card.Title className='cardCalendar__title'>Crea un Evento</Card.Title>
                <Form onSubmit={handleSubmit(onSubmit)} className='cardCalendar__form'>
                    <Form.Group className='cardCalendar__form-group'>
                        <Form.Label>Titulo:</Form.Label>
                        <Form.Control
                            type='text'
                            name='title-e'
                            className='cardCalendar__group-title'
                            placeholder='Ingresa un titulo del evento'
                            {...register('title-e', { required: true })}
                        />
                        <p>{errors.event_name?.message}</p>
                    </Form.Group>
                    <Form.Group className='cardCalendar__form-group'>
                        <Form.Label>Descripcion:</Form.Label>
                        <Form.Control
                            type='text'
                            name='descr-e'
                            className='cardCalendar__group-descr'
                            placeholder='Ingresa un descripcion del evento'
                            {...register('descr-e')}
                        />
                        <p>{errors.event_description?.message}</p>
                    </Form.Group>
                    <Form.Group className='m-3'>
                        <Form.Group className='cardCalendar__form-group'>
                            <Form.Label>Fecha de Inicio:</Form.Label>
                            <Form.Control
                                type='datetime-local'
                                name='startDate-e'
                                className='cardCalendar__group-startDate'
                                placeholder='Selecciona la fecha inicial'
                                {...register('startDate-e')}
                            />
                            <p>{errors.event_start_date?.message}</p>
                        </Form.Group>
                        <Form.Group className='cardCalendar__form-group'>
                            <Form.Label>Fecha Finalización:</Form.Label>
                            <Form.Control
                                type='datetime-local'
                                name='endDate-e'
                                className='cardCalendar__group-endDate'
                                placeholder='Selecciona la fecha final'
                                {...register('endDate-e')}
                            />
                            <p>{errors.event_end_date?.message}</p>
                        </Form.Group>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Color</Form.Label>
                        <Form.Control
                            type='color'
                            name='color-e'
                            className='cardCalendar__group-color'
                            placeholder='Ingresa un color para el evento'
                            {...register('color-e')}
                        />
                        <p>{errors.color?.message}</p>
                    </Form.Group>
                    <Button
                        variant='success'
                        type='submit'
                        className='cardCalendar__btn'
                    >
                        Crear
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );


}

export default CardCalendarComponent;