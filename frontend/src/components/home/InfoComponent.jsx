import { Card, CardBody, CardText, Button, CardTitle} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const InfoComponent = () =>{
    return (
        <>
            <Card style={{width: '40rem'}}>
                <CardBody>
                    <CardTitle style={
                        {
                            fontSize: '4rem', 
                            display: 'flex', 
                            marginBottom: '2rem',
                            fontFamily: '"Roboto Slab", serif'
                        }}>
                            Taskly
                    </CardTitle>
                    
                    <CardText style={
                        {
                            fontFamily: '"Roboto Slab", serif', 
                            display: 'flex', 
                            textAlign: 'justify'   
                        }}>
                            ¿Cansado de olvidar fechas importantes o perderte eventos clave? Taskly es tu asistente personal para gestionar eventos de manera sencilla y eficiente. Asigna tus actividades a un calendario interactivo, recibe recordatorios y mantén todo bajo control.
                    </CardText>
                    <NavLink to='/SignUp'><Button variant='primary' type='button' className='me-2' style={{ backgroundColor: ' rgb(47, 126, 245)'}}>Crear una cuenta</Button></NavLink>
                </CardBody>
            </Card>
        </>
    );
}

export default InfoComponent;