import { Card } from "react-bootstrap";
import { useAuthContext } from '@/hooks/useAuthContext';
import { useEffect, useState } from "react";
import Header from '@/components/Header'

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
    const { token, userPayload } = useAuthContext();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
// console.log("Payload recibido:", userPayload);

        // console.log("Informacion de usuario enviada del backend: ",userData)
        const userById = async () => {
            // if (!userPayload?.id_user) return;

            try {
                const response = await fetch(`${API_URL}/taskly/users/${userPayload.id_user}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });

                const result = await response.json();
                console.log("Respuesta cruda del backend:", result);

                setUserData(result);
            } catch (error) {
                console.log("Error al encontrar por Id", error);
            }
        };

        userById();
    }, [userPayload, token]);

    return (
        <>
        <Header/>
            <Card>
                <Card.Body>
                    <Card.Title>Perfil</Card.Title>
                    {userData ? (
                        <>
                            <Card.Text>Nombre: {userData.first_name}</Card.Text>
                            <Card.Text>Apellido: {userData.last_name}</Card.Text>
                        </>
                    ) : (
                        <Card.Text>Cargando datos...</Card.Text>
                    )}
                </Card.Body>
            </Card>
        </>
    );
};

export default Profile;
