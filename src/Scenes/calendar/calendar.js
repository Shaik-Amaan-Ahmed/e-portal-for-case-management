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
  const [events, setEvents] = useState([]);
  const [etitle, setEtitle] = useState(null);
  const ref = useRef(null);
  const handleSelect = (info,e) => {
    const { start, end } = info;
    setEvents([
      ...events,
      {
        start,
        end,
        title: etitle
      }
    ]);
    ref.current.click();
    console.log(events)

  }
  const onChange = (e) => {
    e.preventDefault();
    setEtitle(e.target.value);
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
                {/* <div className="mb-3">
                  <label htmlFor="title" className="form-label">Enter Title</label>
                  <input type="text" className="form-control" id="title" onChange={onChange}  aria-describedby="title" />
                </div> */}
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum delectus impedit a eos, deleniti temporibus consectetur quos vero nulla libero, tempore, quidem ratione recusandae. Praesentium aut voluptatibus iusto officia distinctio odio, ab enim harum? Explicabo minima sed debitis odio laboriosam quod eaque earum voluptatem eius quis. Quibusdam eos ut soluta, officia iste nisi, incidunt atque, placeat ea veniam aut fugit! Impedit minus numquam veritatis cumque aliquam eum dignissimos praesentium labore beatae corrupti sint quidem optio, a recusandae temporibus asperiores, adipisci fugiat! Obcaecati illo culpa consequatur asperiores nulla commodi iure aperiam exercitationem molestias. Aspernatur, ducimus veritatis veniam animi expedita dicta temporibus.</p>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              {/* <button type="submit" className="btn btn-primary" onClick={handleSelect}>Save changes</button> */}
            </div>
          </div>
        </div>
      </div>

      <div>
        <FullCalendar
          // editable
          selectable
          // select={handleSelect}
          headerToolbar={{
            start: "today prev next",
            center: "title",
            end: "dayGridMonth dayGridWeek dayGridDay"
          }}
          eventClick={handleSelect}
          events={events}
          eventContent={(info) => <EventItem info={info} />}
          plugins={[daygridPlugin, interactionPlugin]}
          views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
        />
      </div>
    </>
  );
};

