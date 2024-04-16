import React, { useState, useRef, useEffect } from 'react';
import { DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import { DayPilot } from "@daypilot/daypilot-lite-react";

import "./CalendarStyles.css";
// import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
// import Inicio from '../Inicio';
import axios from 'axios';

const Calendar = ({setToken, OnLogout}) => {
  const gettoken = sessionStorage.getItem('token');
  const token = JSON.parse(gettoken);
  const [tipoExamen, setTipoExamen] = useState("Radiografía");
  // const editEvent = async (e) => {
  //   const dp = calendarRef.current.control;
  //   const modal = await DayPilot.Modal.prompt("Update event text:", e.text());
  //   if (!modal.result) { return; }
  //   e.data.text = modal.result;
  //   dp.events.update(e);
  // };

  const fetchEventInfo = async (eID) => {
    axios.post('http://localhost:5000/citas/getCitaById', {
      id: eID,
    })
      .then(response => {
      const event = response.data
      console.log(event[0]);
      const msg = "<div className='alo'>" +
      "RUT: " + event[0].rutPaciente + 
      "<br/>Nombre: " + event[0].nombrePaciente + 
      "<br/>Tipo de examen: " + event[0].tipoEx + 
      "<br/>Motivo: " + event[0].motivoEx + 
      "<br/>Información extra: " + event[0].infoExtra + 
      "<br/>Contacto: " + event[0].contacto +
      "</div>";

      DayPilot.Modal.alert(msg, { theme: "modal_rounded"});
    })
    .catch(error => console.error(error));
  }

  const [config] = useState({
    viewType: "Week",
    durationBarVisible: false,
    onEventClick: async args => {
      await fetchEventInfo(args.e.data.id);
      //console.log(args.e.data.id);
    },
  });

  useEffect(() => {
    axios.get('http://localhost:5000/citas/getCitas', {
      params:  {
        tipoEx: tipoExamen
      }
    })
    .then(response => {
      const events = response.data.map(schedule => ({
        id: schedule._id,
        text: schedule.nombrePaciente,
        start: new Date(schedule.fecha),
        end: new Date(schedule.fin),
      }));
      calendarRef.current.control.update({events});
    })
    .catch(error => console.error(error));
    // const startDate = DayPilot.Date.today();
    //calendarRef.current.control.update({startDate, events});
  }, [tipoExamen]);

  const calendarRef = useRef();

  const handleTimeRangeSelected = args => {
    calendarRef.current.control.update({
      startDate: args.day
    });
  }

  const handleSelect = (e) => {
    setTipoExamen(e.target.value);
  }
  
  return (
    <div>
      <Navbar token={token} setToken={setToken} OnLogout={OnLogout}/> 
      <div className="d-flex">
        <div className="d-flex flex-column justify-content-center align-items-center mx-3" style={{width: '21%'}}>
          <div className='d-flex flex-column mt-2 w-100 mb-4 align-items-start'>
            <h5>Tipo de examen:</h5>
            <select className='form-select w-100' name="tipoExamen" value={tipoExamen} onChange={(e) => handleSelect(e)}>
              <option value="Radiografía">Radiografía</option>
              <option value="Scanner">Scanner</option>
              <option value="Ecografía">Ecografía</option>
              <option value="Resonancia">Resonancia magnética</option>
            </select> 
          </div>
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