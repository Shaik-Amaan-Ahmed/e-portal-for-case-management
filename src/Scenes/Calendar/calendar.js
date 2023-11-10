import Header from "../../Components/Header";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { render } from "@testing-library/react";
import Events from "../../Components/events";
import { useState } from "react";

const events = [
  {
    resourceId: "a",
    title: "event 1",
    groupId: "redEvents",
    start: "2023-11-10T10:30:00", //time format: "yyyy-mm-ddThh:mm:ss"
    end: "2023-11-10T12:30:00",
    color: "red",
  },
  {
    resourceId: "b",
    title: "Mr Susheel vs Appolo pharmaceuticals",
    groupId: "redEvents",
    start: "2023-11-10T10:00:00", //time format: "yyyy-mm-ddThh:mm:ss"
    end: "2023-11-10T13:30:00",
    color: "orange",
  },
  {
    resourceId: "c",
    title: "event 3",
    groupId: "redEvents",
    start: "2023-11-10T10:30:00", //time format: "yyyy-mm-ddThh:mm:ss"
    end: "2023-11-10T12:30:00",
    color: "blue",
  },
];

const resources = [
  {
    id: "a",
    title: "Court A",
    eventColor: "green",
    width: "50%",
  },
  {
    id: "b",
    title: "Court B",
    eventColor: "red",
  },
  {
    id: "c",
    title: "Court C",
    eventColor: "orange",
  },
  {
    id: "d",
    title: "Court D",
    eventColor: "blue",
  },
  {
    id: "e",
    title: "Court E",
    eventColor: "pink",
  },
  {
    id: "f",
    title: "Court F",
    eventColor: "yellow",
  },
  {
    id: "g",
    title: "Court G",
    eventColor: "purple",
  },
  {
    id: "h",
    title: "Court H",
    eventColor: "brown",
  },
  {
    id: "i",
    title: "Court I",
    eventColor: "grey",
  },
  {
    id: "j",
    title: "Court J",
    eventColor: "black",
  },
  {
    id: "k",
    title: "Court K",
    eventColor: "white",
  },
  {
    id: "l",
    title: "Court L",
    eventColor: "green",
  },
  {
    id: "m",
    title: "Court M",
    eventColor: "red",
  },
];

function Calendar() {

    const [isopen, setIsOpen] = useState(false);

  return (
    <Box>
      <Header title="Calendar" subtitle="View Calendar" />

      <FullCalendar
        dayMaxEventRows={true}
        selectable={true}
        plugins={[
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
          resourceTimelinePlugin,
        ]}
        contentHeight={600}
        aspectRatio={9}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,resourceTimelineDay,resourceTimelineWeek",
        }}
        handleWindowResize={true}
        stickyHeaderDates={false}
        updateSize={true}
        events={events}
        initialView="resourceTimelineDay"
        eventClick={function () {
            setIsOpen(!isopen)
            if(!isopen){
           return (<Events />)
            }
        }}
        select={function(){
            return (<Events/>)
        }
        }
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        scrollTime={"12:00:00"}
        slotMinTime={"08:00:00"}
        slotMaxTime={"18:00:00"}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: "08:00",
          endTime: "18:00",
        }}
        resources={resources}
        resourceAreaWidth={100}
        
      />
    </Box>
  );
}
render.Calendar = Calendar;
export default Calendar;
{
  /* <Box>
                <table style={{width:"100%"}}>
                    <thead>
                        <tr>
                            <th>Sunday</th>
                            <th>Sunday</th>
                            <th>Sunday</th>
                            <th>Sunday</th>
                            <th>Sunday</th>
                            <th>Sunday</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
                </Box> */
}
