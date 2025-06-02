import { Modal, Form, Button } from "react-bootstrap";
import { useAuthContext } from '@/hooks/useAuthContext';
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const UpdateProfileComponent = () => {
    const {
        token,
        selectedUser,
        setShowModal,
        showModal,
        setUserData
    } = useAuthContext();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        address: '',
        phone_num: ''
    });

    // Cargar los datos del usuario cuando se abra el modal
    useEffect(() => {
        if (showModal && selectedUser) {
            setFormData({
                first_name: selectedUser.first_name || '',
                last_name: selectedUser.last_name || '',
                address: selectedUser.address || '',
                phone_num: selectedUser.phone_num || ''
            });
        }
    }, [showModal, selectedUser]);

    // Manejador de cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Enviar actualización al backend
    const updateUserById = async () => {
        try {
            const response = await fetch(`${API_URL}/taskly/users/${selectedUser.id_users}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                alert('Usuario actualizado correctamente');
                setUserData(result); // Recarga el contexto con los datos nuevos
                setShowModal(false);
            } else {
                console.error("Error al actualizar usuario:", result);
                alert(result.message || 'Error al actualizar el usuario');
            }
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            alert('Error inesperado al actualizar el usuario.');
        }
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Actualizar Perfil</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="firstName">
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Label>Apellido:</Form.Label>
                        <Form.Control
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="address">
                        <Form.Label>Dirección:</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="phoneNum">
                        <Form.Label>Teléfono:</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone_num"
                            value={formData.phone_num}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={updateUserById}>
                    Actualizar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateProfileComponent;
