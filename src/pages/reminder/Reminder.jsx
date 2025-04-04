import CalendarComponent from "@/components/CalendarComponent";
import Header from '@/components/Header';
import CardCalendarComponent from "@/components/CardCalendarComponent";

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