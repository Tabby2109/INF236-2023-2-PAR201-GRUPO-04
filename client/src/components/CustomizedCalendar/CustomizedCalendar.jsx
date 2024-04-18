import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment-timezone';
import AppointmentForm from './AppointmentForm';

require('moment/locale/es.js')

const localizer = momentLocalizer(moment);

const CustomizedCalendar = () => {
  const gettoken = sessionStorage.getItem('token');
  const token = JSON.parse(gettoken);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [tipoExamen, setTipoExamen] = useState("Radiografía");
  const [settings, setSettings] = useState({
    step: 15
  })
  const { formats } = useMemo(
    () => ({
      formats: {
        weekdayFormat: (date, culture, localizer) =>
          localizer.format(date, 'dddd', culture),
      },
    }), [])
  
  const handleSelectSlot = (slotInfo) =>{
    setShowModal(true);
    setSelectedDate(slotInfo);
  }

  // const saveEvent = () => {
  //   if ( selectedDate ){
  //     const newEvent = {
  //       title: "si",
  //       start: selectedDate,
  //       end: moment(),
  //     }
  //     setShowModal(false);
  //   }
  // }

  // Obtener todos los eventos
  useEffect(() => {
    if (tipoExamen === "Radiografía"){
      setSettings({
        step: 15
      })
    } else if (tipoExamen === "Resonancia"){
      setSettings({
        step: 60
      })
    } else if (tipoExamen === "Scanner"){
      setSettings({
        step: 40
      })
    } else if (tipoExamen === "Ecografía"){
      setSettings({
        step: 20
      })
    }
    axios.get('http://localhost:5000/citas/getCitas', {
      params:  {
        tipoEx: tipoExamen
      }, 
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      const events = response.data.map(schedule => ({
        title: schedule.nombrePaciente,
        start: new Date(schedule.fecha),
        end: new Date(schedule.fin),
      }));

      setEvents(events);
    })
    .catch(error => console.error(error));
  }, [token, tipoExamen]);

  return (
    <div className='d-flex justify-content-center mt-3 mx-5' >
      {/* Sección izquierda */}
      <div className='me-5'>
        <h5>Seleccionar tipo de examen:</h5>
        <select className='form-select mb-4' name="tipoExamen" value={tipoExamen} onChange={(e) => setTipoExamen(e.target.value)}>
          <option value="Radiografía">Radiografía</option>
          <option value="Scanner">Scanner</option>
          <option value="Ecografía">Ecografía</option>
          <option value="Resonancia">Resonancia magnética</option>
        </select>
      </div>
      {/* Sección derecha */}
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        defaultView={"week"}
        min={moment('8:00am', 'h:mma').toDate()}
        max={moment('5:00pm', 'h:mma').toDate()}
        messages = {{
          allDay: "Todo el día",
          previous: "Anterior",
          next: "Siguiente",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
          date: "Fecha",
          time: "Hora",
          event: "Evento",
          noEventsInRange: "Sin eventos"
      }}
      timeslots={1}   // Cantidad de celdas
      step={settings.step}   // Duración por celda
      formats={formats}
      selectable = {true}
      onSelectSlot={handleSelectSlot}
      style={{
        width: '90vw',
        height: '80vh',
      }}
      />


    { showModal && (
      <div 
        className="modal" 
        style={{
          display: 'block',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }}
        tabIndex="-1" 
      >
        {console.log(selectedDate)}
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Agregar cita - { tipoExamen } - { moment(selectedDate.start).format("DD/MM/YYYY HH:mm") }</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <AppointmentForm token={token} setShowModal={setShowModal} tipoExamen={tipoExamen} fecha={selectedDate.start}/>
            </div>
          </div>
        </div>
      </div>
      
    ) }
    </div>
  )
}

export default CustomizedCalendar;
