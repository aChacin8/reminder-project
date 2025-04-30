import { EventContext } from "@/context/EventContext";
import { useContext } from "react";

export const useEventContext = () => {
    const context = useContext (EventContext)

    if (!context){
        throw new Error("Error");
    } 
        return context;
    
}