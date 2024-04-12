import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.css";
import Navbar from '../Navbar';

import axios from 'axios';
import SimpleForm from './SimpleForm'
// import { useNavigate } from 'react-router-dom';

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


const Calendar = ({setToken,OnLogout}) => {
  // const navigate = useNavigate();
  const gettoken = sessionStorage.getItem('token');
  const token = JSON.parse(gettoken);
  const [horaSelect, setHoraSelect] = useState(null);

  const fetchEventInfo = async (eID) => {
    axios.post('http://localhost:5000/citas/getCitaById', {
      id: eID,
    })
      .then(response => {
      const event = response.data;
      const msg = 
      "RUT: " + event[0].rutPaciente + 
      "<br/>Nombre: " + event[0].nombrePaciente + 
      "<br/>Tipo de examen: " + event[0].tipoEx + 
      "<br/>Motivo: " + event[0].motivoEx + 
      "<br/>Información extra: " + event[0].infoExtra + 
      "<br/>Contacto: " + event[0].contacto;
      DayPilot.Modal.alert(msg, { theme: "modal_rounded"});
    })
    .catch(error => console.error(error));
  }

  // const editEvent = async (e) => {
  //   const dp = calendarRef.current.control;
  //   const modal = await DayPilot.Modal.prompt("Update event text:", e.text());
  //   if (!modal.result) { return; }
  //   e.data.text = modal.result;
  //   dp.events.update(e);
  // };

  const [showForm, setShowForm] = useState(false);

  const activateShowForm = () => {
    setShowForm(true);
  }

  const [config] = useState({
    viewType: "Week",
    durationBarVisible: false,
    onEventClick: async args => {
      await fetchEventInfo(args.e.data.id);

    },
    onTimeRangeSelected: async args => {
      setHoraSelect(args.start);
      activateShowForm()
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

    // const startDate = DayPilot.Date.today();
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
      <Navbar token={token} setToken={setToken} OnLogout={OnLogout}/> 
      <div style={styles.wrap}>
        
        <div style={styles.left}>
            <DayPilotNavigator selectMode={"Week"} showMonths={2} skipMonths={2} onTimeRangeSelected={handleTimeRangeSelected}/>
        </div>
        <div> 
            <DayPilotCalendar {...config} ref={calendarRef}/>
        </div>
        <div>
        {showForm && (
          <SimpleForm hora={horaSelect} setShowForm={setShowForm} />
        )}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
