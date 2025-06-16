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
            setToken(token); 
            const user = jwtDecode(token); 
            setUserPayload (user); 
            setIsAuth(true); 
        }

        const logout = () => {
            sessionStorage.removeItem('token', token)
            setUserPayload (null); 
            setIsAuth(false); 
            setToken(null); 
        }

        useEffect(() => {
            const storedToken = sessionStorage.getItem('token'); 
            if (storedToken) {
                setToken(storedToken); 
                const user = jwtDecode(storedToken); 
                setUserPayload(user); 
                setIsAuth(true); 
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
                            'Authorization': `Bearer ${token}` 
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Error al obtener el token');
                    }
                    
                    const result = await response.json();
                    console.log('Validacion:', result); 
                } catch (error) {
                    console.error('Error al obtener el token:', error);
                }
            }
            if (token) {
                fetchToken(); 
            }
        }, [token]); 
        
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