import jwtDecode from 'jwt-decode';
import React from 'react'
import { useState, useEffect, useRef } from 'react';
import Header from '../../../partials/Header'
import Sidebar from '../../../partials/Sidebar'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import DashboardCard08 from '../../../partials/dashboard/DashboardCard08';
import setAuthToken from '../../../Auth/Util/setAuthToken';

let logUser

if (localStorage.jwt) {
  const jwt = localStorage.getItem("jwt")
  setAuthToken(jwt)
  logUser = jwtDecode(jwt)
}


function AppointmentList() {
  const [user, setUser] = useState(logUser)
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);
  const [eventTitle, setEventTitle] = useState('');

  const handleEventDrop = ({ event }) => {
    const updatedEvent = {
      ...event.toPlainObject(),
      start: event.start.toISOString(),
      end: event.end.toISOString(),
    };

    setEvents((prevEvents) =>
      prevEvents.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
    );
  };

  const handleEventClick = (info) => {
    setEventTitle(info.event.title);
  };




  useEffect(() => {
    // fetch events from API and set the state
    // for example:
    setEvents([
      { id: 1, title: 'meeting me', start: '2023-03-01T12:01:00', end: '2023-03-01T14:00:00' },
      { id: 2, title: 'Event 2', start: '2023-03-02T12:00:00', end: '2023-03-02T14:00:00' },
      { id: 3, title: 'Event 3', start: '2023-03-03T12:00:00', end: '2023-03-03T14:00:00' },
    ]);
  }, []);


  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 grid grid-cols-2 gap-4 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            <div className="AppointmentsCalendar">
              <FullCalendar
                ref={calendarRef}
                // plugins={[dayGridPlugin, interactionPlugin]}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView="dayGridMonth"
                editable={true}
                eventDrop={handleEventDrop}
                events={events}
                eventClick={handleEventClick}
                views={{
                  month: { buttonText: 'Month' }
                }}
                // eventClick={(info) => {
                //   alert('Appointment Title: ' + info.event.title);
                // }}
                selectable={true}
              />
              {eventTitle && <p>{eventTitle}</p>}
            </div>

            <div className="sm:flex sm:justify-between sm:items-center mb-20">
              <DashboardCard08 />
            </div>

          </div>
        </main>
      </div>

    </div>
  )

}
export default AppointmentList