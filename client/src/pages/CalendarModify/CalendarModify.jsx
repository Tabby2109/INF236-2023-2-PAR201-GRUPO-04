import React, { useState, useRef, useEffect } from 'react';
import { DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import { Modal } from "@daypilot/modal";

import "./CalendarStyles.css";
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

const CalendarModify = ({setToken, OnLogout}) => {
  const gettoken = sessionStorage.getItem('token');
  const token = JSON.parse(gettoken);
  console.log(token);

  const fetchEventInfo = async (eID) => {
    axios.post('http://localhost:5000/citas/getCitaById', {
      id: eID,
    })
      .then(response => {
      const event = response.data
      
      const form = [
        {name: "RUT", id: "rut"},
        {name: "Nombre", id: "nombre"},
        {name: "Tipo de examen", id: "tipoEx"},
        {name: "Motivo", id: "motivo", type: "textarea"},
        {name: "Información extra", id: "infoExtra", type: "textarea"},
        {name: "Contacto", id: "contacto"}
      ];
      
      const data = {
        rut: event[0].rutPaciente,
        nombre: event[0].nombrePaciente,
        tipoEx: event[0].tipoEx,
        motivo: event[0].motivoEx,
        infoExtra: event[0].infoExtra,
        contacto: event[0].contacto
      };
      // De momento solo lo muestra, pero prontamente se cambiará para realizar la modificación de horas.
      Modal.form(form, data, { theme: "modal_rounded" }).then(function(modal) {
        console.log(modal);
      });
      
      // DayPilot.Modal.alert(msg, { theme: "modal_rounded"});
    })
    .catch(error => console.error(error));
  }

  const [config] = useState({
    viewType: "Week",
    durationBarVisible: false,
    onEventClick: async args => {
      await fetchEventInfo(args.e.data.id);
    },
  });

  useEffect(() => {
    axios.get('http://localhost:5000/citas/getCitas')
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
  }, []);

  const calendarRef = useRef();

  const handleTimeRangeSelected = args => {
    calendarRef.current.control.update({
      startDate: args.day
    });
  }

  return (
    <div>
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
}

export default CalendarModify;