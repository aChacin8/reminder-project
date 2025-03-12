import {Card, Button, Form} from 'react-bootstrap';
import './SignUp.scss'

const SingUp = () => {


    return (
        <Card style={{ width: '22rem' }} className='justify-content-center mx-auto mt-5'>
            <Card.Body className='text-center'>
                <Card.Title>Sign Up</Card.Title>
                <Form >
                    <Form.Group className='mb-3 mt-5'>
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control
                            type='text'
                            id='first_name'
                            name='first_name'
                            placeholder='First name'
                            required
                            {...register('first_name')}
                        />
                        <p>{errors.firstName?.message}</p>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control
                            type='text'
                            id='last_name'
                            name='last_name'
                            placeholder='Last name'
                            required
                            {...register('last_name')}
                        />
                        <p>{errors.lastName?.message}</p>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Gender:</Form.Label>
                        <Form.Select
                            className='mb-3'
                            name='gender'
                            onChange={() => { }}
                            required
                            {...register('gender')}
                        >
                            <option value='M'>Male</option>
                            <option value='F'>Female</option>
                            <option value='O'>other</option>
                        </Form.Select>
                        <p>{errors.gender?.message}</p>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type='email'
                            name='email'
                            placeholder='name@example.com'
                            required
                            {...register('email')}
                        />
                        <p>{errors.email?.message}</p>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            name='password'
                            placeholder='Password'
                            required
                            {...register('password')}
                        />
                        <p>{errors.password?.message}</p>
                    </Form.Group>
                    <Button variant='success' type='submit' className='w-100 btn btn-outline-primary '>Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default SingUp; 