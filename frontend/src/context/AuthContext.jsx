    import { createContext, useState, useEffect } from "react";
    import {jwtDecode} from 'jwt-decode'; //Libreria para decodificar el token JWT

    const AuthContext = createContext();
    const API_URL = import.meta.env.VITE_API_URL; // URL de la API desde el archivo .env

    const AuthProvider = ({children})=> {
        const [isAuth, setIsAuth] = useState(false);  //Para saber si el usuario esta autenticado
        const [userPayload, setUserPayload] = useState(null); //JWT payload decodificando
        const [token, setToken] = useState(null); //Para almacenar el token JWT
        const [showModal, setShowModal] = useState(false);
        const [selectedUser, setSelectedUser] = useState(null);
        const [userData, setUserData] = useState(null);


        const login = (data) => {
            const token = typeof data === 'string' ? data : data.token;
            sessionStorage.setItem('token', token);
            setToken(token); //Almacena el token en el estado
            const user = jwtDecode(token); //Decodifica el token
            setUserPayload (user); //Almacena el payload decodificado
            setIsAuth(true); //Actualiza el estado de autenticacion a verdadero
        }

        const logout = () => {
            setUserPayload (null); //Borra el payload decodificado
            setIsAuth(false); //Actualiza el estado de autenticacion a falso
            setToken(null); //Borra el token del estado
        }

        useEffect(() => {
            const storedToken = sessionStorage.getItem('token'); //Obtiene el token del sessionStorage
            if (storedToken) {
                setToken(storedToken); //Almacena el token en el estado
                const user = jwtDecode(storedToken); //Decodifica el token
                setUserPayload(user); //Almacena el payload decodificado
                setIsAuth(true); //Actualiza el estado de autenticacion a verdadero
            }
        }, []);

        useEffect(() => {
            const fetchToken = async () => {
            if (!token) return; // Si no hay token, no hacer la solicitud
                try {
                    const response = await fetch(`${API_URL}/taskly/verify-token`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` // Agrega el token al encabezado de autorización
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Error al obtener el token');
                    }
                    
                    const result = await response.json();
                    console.log('Validacion:', result); // Muestra el token obtenido
                } catch (error) {
                    console.error('Error al obtener el token:', error);
                }
            }
            if (token) {
                fetchToken(); //Llama a la funcion para obtener el token
            }
        }, [token]); //Dependencia del token
        
        const data = {
            userPayload,
            isAuth,
            login,
            logout,
            token,
            showModal,
            setShowModal,
            selectedUser,
            setSelectedUser,
            userData, 
            setUserData
        };

        return (
            <AuthContext.Provider value={data}>
                {children}
            </AuthContext.Provider>
        ) 
    }

    export {AuthContext, AuthProvider}; //Exporta el contexto y el proveedor