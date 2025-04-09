import { Card, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import '@/styles/Calendar.scss'
import { useEventContext } from '@/hooks/useEventContext';


const CardCalendarComponent = () => {
    const {register, handleSubmit, formState: { errors }} = useForm (); 
    const {events, setEvents} = useEventContext();
    const onSubmit = async (data) => {        
        if (new Date(data['endDate-e']) < new Date(data['startDate-e'])) {
            alert('La fecha de finalización no puede ser anterior a la de inicio.');
            return;
        }

        try {
            const token = sessionStorage.getItem ('token');

            const response = await fetch ('http://localhost:3000/reminder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` //Para verificar el JWT
                },
                body: JSON.stringify({
                    name : data ['title-e'],
                    description: data ['descr-e'],
                    start_date: data ['startDate-e'],
                    end_date: data ['endDate-e'],
                    color: data ['color-e']
                })
            });
            
            const result = await response.json();
            console.log(result);
            alert('Evento creado con éxito');

            setEvents ([...events,result]); //Actualizar el contexto de los eventos
            
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
                        {...register('title-e', {required: true})}
                    />
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