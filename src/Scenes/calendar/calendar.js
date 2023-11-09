import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useRef } from "react";

const EventItem = ({ info }) => {
  const { event } = info;
  return (
    <div>
      <p>{event.title}</p>
    </div>
  );
};


export const MyCalendar = () => {
  // const [events, setEvents] = useState([]);
  const [etitle, setEtitle] = useState([]);
  const ref = useRef(null);
  const handleSelect = (info) => {
    const { start, end } = info;
    ref.current.click();

    // setEvents([
    //   ...events,
    //   {
    //     id: uuid(),
    //     title: items.title,
    //     start,
    //     end
    //   }
    // // ]);
    // console.log(events)
  }
  const onChange = (e) => {
    setEtitle()
}
  return (
    <>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add Event</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Enter Title</label>
                  <input type="text" className="form-control" id="title"  value={etitle} onChange={onChange} name={etitle} aria-describedby="title" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <FullCalendar
          // editable
          selectable
          select={handleSelect}
          headerToolbar={{
            start: "today prev next",
            center: "title",
            end: "dayGridMonth dayGridWeek dayGridDay"
          }}
          events={[
            { title: 'text', date: '2023-11-08' },
            { title: 'event 2', date: '2023-11-09' },
            { title: 'event 2', date: '2023-11-10' },
            { title: 'event 2', date: '2023-11-11' },
            { title: 'event 2', date: '2023-11-12' },
            { title: 'event 2', date: '2023-11-08' },
            { title: 'event 2', date: '2023-11-08' }
          ]}
          eventContent={(info) => <EventItem info={info} />}
          plugins={[daygridPlugin, interactionPlugin]}
          views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
        />
      </div>
    </>
  );
};