import CalendarComponent from "@/components/calendar/CalendarComponent";
import Header from '@/components/Header';
import CardCalendarComponent from "@/components/calendar/CardCalendarComponent";

const Reminder = () => {

    return (
        <>
            <Header/>
            <div className="d-flex">
                <CardCalendarComponent/>
                <CalendarComponent/>
            </div>
            
        </>
    );
}

export default Reminder;