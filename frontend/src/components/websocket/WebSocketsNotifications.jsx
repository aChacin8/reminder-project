// src/components/WebSocketNotifications.jsx
import { useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL;

const WebSocketNotifications = () => {
    const { userPayload } = useContext(AuthContext);

    useEffect(() => {
        if (!userPayload?.id_users) return;

        const socket = io(API_URL, {
            transports: ["websocket"],
        });

        socket.on("connect", () => {
            console.log("WebSocket conectado con ID:", socket.id);

            socket.emit("join-user-room", userPayload.id_users);
        }); // Unirse a la sala del usuario

        socket.on("disconnect", () => {
            console.log("WebSocket desconectado");
        }); // Manejar desconexión
        
        socket.on("event-expiring", (data) => {
            console.log("Notificación recibida:", data);
            alert("Notificación: " + data.message);
        });         // Escuchar notificaciones del backend
        return () => {
            socket.disconnect();
        };
    }, [userPayload]);

    return null;
};

export default WebSocketNotifications;
