import { Card } from "react-bootstrap";
import { useAuthContext } from '@/hooks/useAuthContext';
import { useEffect, useState } from "react";
import Header from '@/components/Header'

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
    const { token, userPayload } = useAuthContext();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userById = async () => {
            try {
                const response = await fetch(`${API_URL}/taskly/users/${userPayload.id_users}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });

                const result = await response.json();
                setUserData(result);
            } catch (error) {
                console.log("Error al encontrar por Id", error);
            }
        };

        userById();
    }, [userPayload, token]);

    return (
        <>
            <Header />
            <Card>
                <Card.Body>
                    <Card.Title>Perfil</Card.Title>
                    {userData && (
                        <div>
                            <Card.Text>Nombre: {userData.first_name}</Card.Text>
                            <Card.Text>Apellido: {userData.last_name}</Card.Text>
                            <Card.Text>Dirección: {userData.address}</Card.Text>
                            <Card.Text>Teléfono: {userData.phone_num}</Card.Text>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </>
    );
};

export default Profile;
