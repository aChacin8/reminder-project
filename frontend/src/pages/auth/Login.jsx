import Header from '@/components/Header'
import { Card, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/hooks/useAuthContext';
import '@/styles/Auth.scss'

const API_URL = import.meta.env.VITE_API_URL; // URL de la API desde el archivo .env

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const {login} = useAuthContext(); // Consumir el contexto de autenticación

    const onSubmit = async (data) => {
        try {
            console.log('Datos enviados:', data);

            const response = await fetch (`${API_URL}/taskly/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            const result = await response.json();
            console.log('Respuesta del backend:', result);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${result.message}`);
            } // Verifica si la respuesta es exitosa
            if (result.token) {
                login(result.token);
            } else {
                console.error("Token inválido o ausente:", result);
            }
            // Si la respuesta es exitosa, se almacena el token en el contexto de autenticación
            if( response.status === 200){
                alert('Usuario autenticado con éxito');
                console.log('Usuario autenticado', result);
                login(result.token); // Pasamos el token al contexto de autenticación
                navigate('/Reminder');
            }
        } catch (error) {
            console.error(error);
        }
    }
    

    return (
        <>
        <Header/>
        <Card style={{ width: '22rem', paddingBlock: '6rem' }} className='justify-content-center mx-auto' id='login'>
            <Card.Body className='text-center' >
                <Card.Title className='mb-5'>Inicio de Sesion</Card.Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type='email'
                            name='email'
                            id='login__email'
                            className='mb-4'
                            placeholder='name@example.com'
                            {...register('email' , {required: true} )}
                        />
                        <p>{errors.email?.message}</p>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            name='password'
                            id='login__password'
                            pattern='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$' // Al menos 8 caracteres, al menos una letra y un número
                            className='mb-5'
                            placeholder='Password'
                            required
                            {...register('password' , {required: true})}
                        />
                        <p>{errors.password?.message}</p>
                    </Form.Group>

                    <Button 
                        variant='success' 
                        type='submit' 
                        className='me-2' 
                        id='login__btn'
                        >
                            Iniciar Sesion
                    </Button>
                    
                    <NavLink to='/SignUp'>
                        <Button    
                            variant='primary' 
                            type='button' 
                            className='me-2' 
                            id='signup__btn'
                            >
                                Registrarse
                        </Button>
                    </NavLink>
                </Form>
            </Card.Body>
        </Card>
        </>
        
    );
}

export default Login;