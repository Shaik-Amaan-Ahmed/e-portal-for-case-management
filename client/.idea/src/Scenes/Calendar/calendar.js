import Header from "../../Components/Header";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, DialogContent, Typography } from "@mui/material";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { render } from "@testing-library/react";
import Events from "../../Components/events";
import { useState } from "react";
import { Popover } from "@mui/material";

const events = [
  {
    resourceId: "a",
    title: "Event 1",
    groupId: "redEvents",
    start: "2023-11-14T11:30:00", //time format: "yyyy-mm-ddThh:mm:ss"
    end: "2023-11-14T12:30:00",
    color: "orange",
    description:
      "The defandant is a phd student from kmit and knows nothing about the law",
  },
  {
    resourceId: "b",
    title: "Mr Susheel vs Appolo pharmaceuticals",
    groupId: "redEvents",
    start: "2023-11-14T11:00:00", //time format: "yyyy-mm-ddThh:mm:ss"
    end: "2023-11-14T13:30:00",
    color: "blue",
  },
  {
    resourceId: "j",
    title: "event 3",
    groupId: "redEvents",
    start: "2023-11-11T11:30:00", //time format: "yyyy-mm-ddThh:mm:ss"
    end: "2023-11-11T12:30:00",
    color: "blue",
  },
  {
    resourceId: "d",
    title: "event 3",
    groupId: "redEvents",
    start: "2023-11-11T08:30:00", //time format: "yyyy-mm-ddThh:mm:ss"
    end: "2023-11-11T17:00:00",
    color: "green",
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
  const [open, setOpen] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState({
    top: 0,
    left: 0,
  });
  const [popoverContent, setPopoverContent] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [color, setColor] = useState("");
  const handleEventClick = (info) => {
    setPopoverContent(info.event.title);
    setDescription(info.event.extendedProps.description);
    setTime(info.event.startStr.split("T")[1]);
    setColor(info.event.backgroundColor);
    setAnchorPosition({
      top: info.jsEvent.clientY,
      left: info.jsEvent.clientX,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(null);
  };
  return (
    <Box>
      
      <Header title="Calendar" subtitle="View Calendar" />
    <Box sx={{marginTop:"10px", padding:"20px", border:"1px solid", borderRadius:"20px", backdropFilter:"transparent"}}>
    <FullCalendar
        dayMaxEventRows={true}
        selectable={true}
        plugins={[
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
          resourceTimelinePlugin,
        ]}

        timeZone="IST/India"
        contentHeight={600}
        aspectRatio={10}
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
        resourceAreaHeaderContent={"Courts"}
        eventClick={handleEventClick}
        nowIndicator={true}
        
        eventAdd={function (info) {
          console.log("event added");
        }}
      />
    </Box>
      
      <Popover
        open={open}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
        onClose={handleClose}
        sx={{
          "& .MuiPopover-paper": {
            maxHeight: "50vh", // Adjust this value as needed
            overflow: "auto",
            backgroundColor: "rgba(255,255,255,0.9)",
            background: "",
            borderRadius: "10px",
            backdropFilter: "blur(5px)",
            padding:'10px',
            WebkitFilter: "blur(0px)",
          },
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" fontWeight="bold" color={color}>
            {popoverContent}
          </Typography>
          <Typography variant="h4" fontWeight="bold" color="#39FF14">
            Starts: {time}
          </Typography>
        </div>
        <Typography variant="h5">{description}</Typography>
        <Typography variant="h5">{description}</Typography>
        <Typography variant="h5">{description}</Typography>
        <Typography variant="h5">{description}</Typography>
      </Popover>
    </Box>
  );
}
export default Calendar;
