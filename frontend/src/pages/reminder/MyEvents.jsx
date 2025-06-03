import Header from '@/components/Header';
import EventsComponent from '@/components/events/EventsComponent';
import '@/styles/MyEvents.scss'


const MyEvents = () => {
    return (
        <div className="my-events">
            <Header/>
            <EventsComponent/>
        </div>
    );
}

export default MyEvents;