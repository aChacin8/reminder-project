import Header from '@/components/Header'
import { Card, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import '@/styles/Auth.scss'


const SingUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm(); // Form hook para manejar el formulario
    const navigate = useNavigate(); // Hook para navegar entre rutas

    const onSubmit = async(data) => {
        try {
            const response = await fetch ('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Indica que el cuerpo de la solicitud es JSON
                },
                body: JSON.stringify(data) // Convierte el objeto "data" a formato JSON
            });
            
            const result = await response.json(); // Convierte la respuesta a formato JSON
            
            if (response.status === 201) { 
                navigate('/login'); // Redirige al usuario a la página de inicio de sesión
                alert('Usuario registrado con éxito'); // Muestra un mensaje de éxito
            }
            console.log(result); // Muestra el resultado en la consola
            
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
        <Header/>
        <Card style={{ width: '25rem' }} className='justify-content-center mx-auto mt-5' id='signup'>
            <Card.Body className='text-center' id='signup__body'>
                <Card.Title id='signup__tittle'>Crear Usuario</Card.Title>
                <Form onSubmit={handleSubmit(onSubmit)} >
                    <Form.Group className='mt-3' id='signup__form-div'>
                        <Form.Group className='mb-2' id='signup__form-name'>
                            <Form.Label className='m-3'>Nombre:</Form.Label>
                            <Form.Control
                                type='text'
                                id='signup__name-first'
                                className='mt-3'
                                name='first_name'
                                placeholder='Ingresa tu nombre'
                                required
                                {...register('first_name')}
                            />
                            <p>{errors.first_name?.message}</p>

                        </Form.Group>

                        <Form.Group className='mb-3' id='signup__form-name'>
                            <Form.Label className='m-3'>Apellido:</Form.Label>
                            <Form.Control
                                type='text'
                                id='signup__name-last'
                                className='m-3'
                                name='last_name'
                                placeholder='Ingresa tu apellido'
                                required
                                {...register('last_name')}
                            />
                            <p>{errors.last_name?.message}</p>
                        </Form.Group>
                    </Form.Group>

                    <Form.Group className="mb-3 d-flex">
    <Form.Label className="mx-4">Género:</Form.Label>
    {['H', 'M', 'O'].map((value) => (
        <div key={value} className="mb-3">
            <Form.Check
                inline
                label={value === 'H' ? 'Hombre' : value === 'M' ? 'Mujer' : 'Otro'}
                name="gender" // El nombre del grupo debe ser el mismo para los 3 botones de opción
                type="radio"
                id={`gender-${value}`}
                value={value}
                {...register('gender', { required: true })}
            />
        </div>
    ))}
    <p>{errors.gender?.message}</p>
</Form.Group>



                    <Form.Group className='mt-3' id='signup__form-div'>
                        <Form.Group className='mb-3' id='signup__form-location'>
                            <Form.Label className='m-3'>Direccion:</Form.Label>
                            <Form.Control
                                type='text'
                                id='signup__location'
                                className='mt-3'
                                name='location'
                                placeholder='Ingresa tu direccion'
                                required
                                {...register('location')}
                            />
                            <p>{errors.location?.message}</p>
                        </Form.Group>
                        <Form.Group className='mb-3' id='signup__form-phone'>
                            <Form.Label className='m-3'>Telefono:</Form.Label>
                            <Form.Control
                                type='text'
                                id='signup__phone'
                                className='m-3'
                                name='phone_number'
                                placeholder='Ingresa tu numero telefonico'
                                {...register('phone_number')}
                            />
                            <p>{errors.phone_number?.message}</p>
                        </Form.Group>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type='email'
                            name='email'
                            className='m-3'
                            id='signup__email'
                            placeholder='nombre@ejemplo.com'
                            required
                            {...register('email')}
                        />
                        <p>{errors.email?.message}</p>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Contraseña:</Form.Label>
                        <Form.Control
                            type='password'
                            name='password'
                            id='signup__password'
                            placeholder='Ingresa una Contraseña'
                            required
                            {...register('password')}
                        />
                        <p>{errors.password?.message}</p>
                    </Form.Group>

                    <Button variant='success' type='submit' className='btn btn-outline-primary mt-3' id='signup__btn'>Registrarse </Button>
                </Form>
            </Card.Body>
        </Card>
        </>
    );
}

export default SingUp; 