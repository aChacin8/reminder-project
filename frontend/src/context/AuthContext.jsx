import { createContext, useState, useEffect } from "react";
import {jwtDecode} from 'jwt-decode'; //Libreria para decodificar el token JWT

const AuthContext = createContext();

const AuthProvider = ({children})=> {
    const [isAuth, setIsAuth] = useState(false);  //Para saber si el usuario esta autenticado
    const [userPayload, setUserPayload] = useState(null); //JWT payload decodificando
    const [token, setToken] = useState(null); //Para almacenar el token JWT
    
    const login = (data) => {
        const token = typeof data === 'string' ? data : data.token;
        sessionStorage.setItem ('token', token); //Almacena el token en el sessionStorage
        const user = jwtDecode(token); //Decodifica el token
        setUserPayload (user); //Almacena el payload decodificado
        setIsAuth(true); //Actualiza el estado de autenticacion a verdadero
        setToken(token); //Almacena el token en el estado
    }

    const logout = () => {
        sessionStorage.removeItem ('token'); //Elimina el token del sessionStorage
        setUserPayload (null); //Borra el payload decodificado
        setIsAuth(false); //Actualiza el estado de autenticacion a falso
        setToken(null); //Borra el token del estado
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                const decode = jwtDecode(token);
                setUserPayload(decode);
                setIsAuth(true);
            } catch (error) {
                console.error("Token inválido:", error.message);
                sessionStorage.removeItem('token');
                setUserPayload(null);
                setIsAuth(false);
            }
        }
    }, []);
    

    const data = {
        userPayload,
        isAuth,
        login,
        logout,
        token
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    ) 
}

export {AuthContext, AuthProvider}; //Exporta el contexto y el proveedor