import CalendarComponent from "@/components/calendar/CalendarComponent";
import Header from '@/components/Header';
import CardCalendarComponent from "@/components/calendar/CardCalendarComponent";
import '@/styles/reminder.scss';

const Reminder = () => {
    return (
        <div className="reminder"> {/* ← Esta clase aplica los estilos del fondo */}
            <Header />
            <div className="d-flex reminder__components">
                <CardCalendarComponent />
                <CalendarComponent />
            </div>
        </div>
    );
};

export default Reminder;