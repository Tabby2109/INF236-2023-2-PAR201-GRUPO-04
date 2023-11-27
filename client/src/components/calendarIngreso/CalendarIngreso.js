import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.css";
import { Link } from 'react-router-dom';
import BarraSuperior from '../BarraSuperior';
import Inicio from '../Inicio';
import axios from 'axios';
import SimpleForm from './SimpleForm'

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


const Calendar = ({token,setToken,OnLogout}) => {
  const [horaSelect, setHoraSelect] = useState(null);
  const fetchEventInfo = async (eID) => {
    axios.post('http://localhost:5000/citas/getCitaById', {
      id: eID,
    })
      .then(response => {
      const event = response.data
      console.log(event[0]);
      const msg = "RUT: " + event[0].rutPaciente + "<br/>Nombre: " + event[0].nombrePaciente + "<br/>TipoExamen: " + event[0].tipoEx + "<br/>Motivo: " + event[0].motivoEx + "<br/>Informacion extra: " + event[0].infoExtra ;
      const modal = DayPilot.Modal.alert(msg, {html: true});
    })
    .catch(error => console.error(error));
  }

  const editEvent = async (e) => {
    const dp = calendarRef.current.control;
    const modal = await DayPilot.Modal.prompt("Update event text:", e.text());
    if (!modal.result) { return; }
    e.data.text = modal.result;
    dp.events.update(e);
  };
  const [showForm, setShowForm] = useState(false);

  const activateShowForm = () => {
    setShowForm(!showForm);
  }
  const [config, setConfig] = useState({
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
