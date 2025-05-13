// src/components/WebSocketNotifications.jsx
import { useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL;

const WebSocketNotifications = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user) return;

        const socket = io(API_URL);

        socket.on("event-expiring", (data) => {
            if (data.userId === user.id_users) {
                toast.info(data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [user]);

    return null;
};

export default WebSocketNotifications;
