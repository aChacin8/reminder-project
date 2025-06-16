import Header from '@/components/Header'
import { Card, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import '@/styles/Auth.scss'

const API_URL = import.meta.env.VITE_API_URL; 

const SingUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm(); 
    const navigate = useNavigate(); 

    const onSubmit = async(data) => {
        try {
            console.log('backendURL:', API_URL); 

            const response = await fetch (`${API_URL}/taskly/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(data) 
            });
            
            const result = await response.json(); 
            
            if (response.status === 201) { 
                alert('Usuario registrado con éxito');              
                navigate('/Login'); 
            }
            console.log(result);
            
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
        <div className='signup'>
        <Header/>
        <Card style={{ width: '25rem', height: '47rem'}} className='justify-content-center mx-auto mt-4' id='signup'>
            <Card.Body className='text-center' id='signup__body'>
                <Card.Title id='signup__tittle'>Crear Usuario</Card.Title>
                <Form onSubmit={handleSubmit(onSubmit)} >
                    <Form.Group className='mt-2' id='signup__form-div'>
                        <Form.Group className='mb-2' id='signup__form-name'>
                            <Form.Label className='m-3'>Nombre:</Form.Label>
                            <Form.Control
                                type='text'
                                id='signup__name-first'
                                className='mt-3'
                                name='first_name'
                                placeholder='Ingresa tu nombre'
                                required
                                {...register('first_name' , {required: true})}
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
                                {...register('last_name' , {required: true})}
                            />
                            <p>{errors.last_name?.message}</p>
                        </Form.Group>
                    </Form.Group>

                    <Form.Group className="d-flex">
                        <Form.Label className="m-2">Género:</Form.Label>
                        {['H', 'M', 'O'].map((value) => (
                            <div key={value} className="mt-2 mb-3">
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

                    <Form.Group className='mt-2' id='signup__form-div'>
                        <Form.Group className='mb-3' id='signup__form-address'>
                            <Form.Label className='m-3'>Direccion:</Form.Label>
                            <Form.Control
                                type='text'
                                id='signup__address'
                                className='mt-2'
                                name='address'
                                placeholder='Ingresa tu direccion'
                                required
                                {...register('address')}
                            />
                            <p>{errors.address?.message}</p>
                        </Form.Group>
                        <Form.Group className='mb-3' id='signup__form-phone'>
                            <Form.Label className='m-3'>Telefono:</Form.Label>
                            <Form.Control
                                type='text'
                                id='signup__phone'
                                className='m-2'
                                name='phone_num'
                                pattern="^\d{10}$"
                                placeholder='Ingresa tu numero telefonico'
                                {...register('phone_num', 
                                    {
                                        pattern: {
                                            value: /^\d{10}$/,
                                            message: 'El número de teléfono debe tener 10 dígitos'
                                        }
                                    }
                                )}
                            />
                            <p>{errors.phone_number?.message}</p>
                        </Form.Group>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type='email'
                            name='email'
                            className='m-2'
                            id='signup__email'
                            placeholder='nombre@ejemplo.com'
                            required
                            {...register('email' , {required: true}) }
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
                            {...register('password' , 
                                {
                                    required: 'La contraseña es requerida',
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-])[A-Za-z\d!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-]{8,}$/,
                                        message: 'La contraseña no cumple con los requisitos'                            
                                    }
                                })}
                        />
                        <ul style={{ fontSize: '0.8rem', color: 'gray', marginTop: '1rem' }}>
                            <li>Debe tener al menos 8 caracteres</li>
                            <li>Debe contener al menos una letra</li>
                            <li>Debe contener al menos un número</li>
                            <li>Debe contener al menos un caracter especial</li>
                        </ul>
                        <p>{errors.password?.message}</p>
                    </Form.Group>

                    <Button 
                        variant='success' 
                        type='submit' 
                        className='btn btn-outline-primary mb-5' 
                        id='signup__btn'
                        >
                            Registrarse 
                    </Button>
                </Form>
            </Card.Body>
        </Card>
        </div>
        
        </>
    );
}

export default SingUp; 