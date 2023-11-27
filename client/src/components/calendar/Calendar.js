import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.css";
import { Link } from 'react-router-dom';
import BarraSuperior from '../BarraSuperior';
import Inicio from '../Inicio';
import axios from 'axios';

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};


const Calendar = ({setToken, OnLogout}) => {
  const gettoken = sessionStorage.getItem('token');
  const token = JSON.parse(gettoken);
  console.log(token);
  const editEvent = async (e) => {
    const dp = calendarRef.current.control;
    const modal = await DayPilot.Modal.prompt("Update event text:", e.text());
    if (!modal.result) { return; }
    e.data.text = modal.result;
    dp.events.update(e);
  };

  const fetchEventInfo = async (eID) => {
    axios.post('http://localhost:5000/citas/getCitaById', {
      id: eID,
    })
      .then(response => {
      const event = response.data
      console.log(event[0]);
      const msg = "RUT: " + event[0].rutPaciente + "<br/>Nombre: " + event[0].nombrePaciente + "<br/>TipoExamen: " + event[0].tipoEx + "<br/>Motivo: " + event[0].motivoEx + "<br/>Informacion extra: " + event[0].infoExtra + "<br/>contacto: " + event[0].contacto;
      const modal = DayPilot.Modal.alert(msg, {html: true});
    })
    .catch(error => console.error(error));
  }
  const [config, setConfig] = useState({
    viewType: "Week",
    durationBarVisible: false,
    onEventClick: async args => {
      await fetchEventInfo(args.e.data.id);
      //console.log(args.e.data.id);
    },
  });

  useEffect(() => {
    //const events = fetchEvents();

    axios.get('http://localhost:5000/citas/getCitas')
        .then(response => {
          // Update your state with the schedules from the database
          const events = response.data.map(schedule => ({
            id: schedule._id,
            text: schedule.nombrePaciente,
            start: new Date(schedule.fecha),
            end: new Date(schedule.fin),
          }));
          calendarRef.current.control.update({events});
        })
        .catch(error => console.error(error));

    const startDate = DayPilot.Date.today();

    //calendarRef.current.control.update({startDate, events});
  }, []);

  const calendarRef = useRef();

  const handleTimeRangeSelected = args => {
    calendarRef.current.control.update({
      startDate: args.day
    });
  }

  return (
    <div>
      <BarraSuperior token={token} setToken={setToken} OnLogout={OnLogout}/> 
      <div style={styles.wrap}>
        
        <div style={styles.left}>
            <DayPilotNavigator selectMode={"Week"} showMonths={2} skipMonths={2} onTimeRangeSelected={handleTimeRangeSelected}/>
        </div>
        <div> 
            <DayPilotCalendar {...config} ref={calendarRef}/>
        </div>
      </div>
    </div>
  );
  /*
  const calendarRef = useRef()

  const editEvent = async (e) => {
    const dp = calendarRef.current.control;
    const modal = await DayPilot.Modal.prompt("Update event text:", e.text());
    if (!modal.result) { return; }
    e.data.text = modal.result;
    dp.events.update(e);
  };

  const [calendarConfig, setCalendarConfig] = useState({
    viewType: "Week",
    durationBarVisible: false,
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async args => {
      const dp = calendarRef.current.control;
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
      dp.clearSelection();
      if (!modal.result) { return; }
      dp.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result
      });
    },
    onEventClick: async args => {
      await editEvent(args.e);
    },
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Delete",
          onClick: async args => {
            const dp = calendarRef.current.control;
            dp.events.remove(args.source);
          },
        },
        {
          text: "-"
        },
        {
          text: "Edit...",
          onClick: async args => {
            await editEvent(args.source);
          }
        }
      ]
    }),
    onBeforeEventRender: args => {
      args.data.areas = [
        {
          top: 3,
          right: 3,
          width: 20,
          height: 20,
          symbol: "icons/daypilot.svg#minichevron-down-2",
          fontColor: "#fff",
          toolTip: "Show context menu",
          action: "ContextMenu",
        },
        {
          top: 3,
          right: 25,
          width: 20,
          height: 20,
          symbol: "icons/daypilot.svg#x-circle",
          fontColor: "#fff",
          action: "None",
          toolTip: "Delete event",
          onClick: async args => {
            const dp = calendarRef.current.control;
            dp.events.remove(args.source);
          }
        }
      ];


      const participants = args.data.participants;
      if (participants > 0) {
        // show one icon for each participant
        for (let i = 0; i < participants; i++) {
          args.data.areas.push({
            bottom: 5,
            right: 5 + i * 30,
            width: 24,
            height: 24,
            action: "None",
            image: `https://picsum.photos/24/24?random=${i}`,
            style: "border-radius: 50%; border: 2px solid #fff; overflow: hidden;",
          });
        }
      }
    }
  });

  useEffect(() => {
    const events = [
      {
        id: 1,
        text: "Event 1",
        start: "2023-10-02T10:30:00",
        end: "2023-10-02T13:00:00",
        participants: 2,
      },
      {
        id: 2,
        text: "Event 2",
        start: "2023-10-03T09:30:00",
        end: "2023-10-03T11:30:00",
        backColor: "#6aa84f",
        participants: 1,
      },
      {
        id: 3,
        text: "Event 3",
        start: "2023-10-03T12:00:00",
        end: "2023-10-03T15:00:00",
        backColor: "#f1c232",
        participants: 3,
      },
      {
        id: 4,
        text: "Event 4",
        start: "2023-10-01T11:30:00",
        end: "2023-10-01T14:30:00",
        backColor: "#cc4125",
        participants: 4,
      },
    ];

    const startDate = "2023-10-02";

    calendarRef.current.control.update({startDate, events});
  }, []);
  
  return (
    <div>
      <BarraSuperior/>
      <div style={styles.wrap}>
        <div style={styles.left}>
          
          <DayPilotNavigator
            selectMode={"Week"}
            showMonths={3}
            skipMonths={3}
            startDate={"2023-10-02"}
            selectionDay={"2023-10-02"}
            onTimeRangeSelected={ args => {
              calendarRef.current.control.update({
                startDate: args.day
              });
            }}
          />
        </div>
        <div style={styles.main}>
          <DayPilotCalendar
            {...calendarConfig}
            ref={calendarRef}
          />
        </div>
      </div>
    </div>
  );*/
}

export default Calendar;
