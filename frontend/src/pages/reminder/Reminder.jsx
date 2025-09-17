import { useState, useEffect } from "react";
import CalendarComponent from "@/components/calendar/CalendarComponent";
import Header from '@/components/Header';
import CardCalendarComponent from "@/components/calendar/CardCalendarComponent";
import '@/styles/reminder.scss';

const Reminder = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768); 
        };

        checkScreenSize(); // Verificación inicial
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return (
        <div className="reminder">
            <Header />
            <div className="d-flex reminder__components">
                <CardCalendarComponent />
                {!isMobile && <CalendarComponent />} 
            </div>
        </div>
    );
};

export default Reminder;
