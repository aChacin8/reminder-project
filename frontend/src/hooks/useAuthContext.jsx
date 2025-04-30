import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context){
        throw new Error ('useAuthContext debe ser utilizado dentro de AuthProvider');
    } else {
        return context;
    }
}
//Consumidor del contexto