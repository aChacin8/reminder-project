import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({children})=> {
    const [isAuth, setIsAuth] = useState(false);  //Para saber si el usuario esta autenticado
    const [token, setToken] = useState(null); //Token JWT

    const login = (newToken) => {
        setToken(newToken); //Almacena el token
        sessionStorage.setItem ('token', newToken); //Almacena el token en el sessionStorage
        setIsAuth(true); //Actualiza el estado de autenticacion
    }

    const logout = () => {
        setToken(null); //Elimina el token
        sessionStorage.removeItem ('token'); //Elimina el token del sessionStorage
        setIsAuth(false); //Actualiza el estado de autenticacion a falso
    }

    useEffect(()=> {
        const token = sessionStorage.getItem ('token')// //Obtiene el token del sessionStorage
        if (token) {
            setToken(token); //Almacena el token
            setIsAuth(true); //Actualiza el estado de autenticacion a verdadero
        }
    }, []); //Se ejecuta una vez al cargar el componente

    const data = {
        token,
        isAuth,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    ) 
}

export {AuthContext, AuthProvider}; //Exporta el contexto y el proveedor