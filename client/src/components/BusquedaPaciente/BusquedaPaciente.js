import React, { useState } from 'react'
import Navbar from '../Navbar';
import axios from 'axios';
import "./BusquedaPacienteStyles.css";
// Date format
import moment from 'moment';

const BusquedaPaciente = ({setToken, OnLogout}) => {
  const gettoken = sessionStorage.getItem('token');
  const token = JSON.parse(gettoken);
  const [events, setEvents] = useState(null);

  const [searchType, setSearchType] = useState('placeholder');
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    // Ninguna casilla marcada
    if (searchType === 'placeholder') {
      alert('Seleccione una opción válida');
      return;
    }

    if (searchType === 'rut') {
      console.log('Buscando por RUT:', searchValue);
      fetchEventInfoByRUT(searchValue);
    } else if (searchType === 'nombre') {
      console.log('Buscando por nombre:', searchValue);
      fetchEventInfoByName(searchValue);
    }
  };

  const fetchEventInfoByRUT = async (rut) => {
    try {
      const response = await axios.get('http://localhost:5000/citas/getCitaByRUT/' + rut)
      const data = response.data;
      setEvents(data);
      
    } catch (error) {
      console.log(error);
    }
  }

  const fetchEventInfoByName = async (name) => {
    try {
      const response = await axios.get('http://localhost:5000/citas/getCitaByName/' + name)
      const data = response.data;
      setEvents(data);
      
    } catch (error) {
      console.log(error);
    }
  }

  // date1-> inicial, date2 -> final
  function calcDiff(date1, date2){
    var initial = new Date(date1);
    var final = new Date(date2);

    // diff está en milisegundos
    var diff = final - initial;
    var hhmm = moment.duration(diff);
    return hhmm.hours() + " horas y " + hhmm.minutes() + " minutos."
  }

  return (
    <>
      <Navbar token={token} setToken={setToken} OnLogout={OnLogout}/>
      <div className='h-100'>
        <div className='container pt-5 pb-5 h-100'>
          <h2>Búsqueda avanzada</h2>
          <div className='d-flex'>
            <input
              className='form-control mr-sm-2 w-50'
              type="text"
              placeholder="Ingrese nombre o RUT"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
              <option value="placeholder">Seleccione una casilla</option>
              <option value="rut">Buscar por RUT</option>
              <option value="nombre">Buscar por nombre</option>
            </select>
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={handleSearch}>Buscar</button>
          </div>
          {(events != null && events.length == 0) && <p className='mt-2'>No existen citas pendientes.</p>}
          {events && 
            <div className='mt-3'>
              { events.map( (event, index)=> (
                <div className="shadow p-3 m-2" key={event._id}>
                  <h3>Cita {index + 1}</h3>
                  <p>RUT: {event.rutPaciente}</p>
                  <p>Paciente: {event.nombrePaciente}</p>
                  <p>Fecha: {moment(event.fecha).format('DD/MM/YYYY')}</p>
                  <p>Hora: {event.hora}</p>
                  <p>Contacto: {event.contacto}</p>
                  <p>Tipo de examen: {event.tipoEx}</p>
                  <p>Motivo: {event.motivoEx}</p>
                  <p>Información extra: {event.infoExtra}</p>
                  <p>Duración: {calcDiff(event.fecha, event.fin)}</p>
                </div>
              ))}
            </div>}
          
        </div>
      </div>
    </>
  );
};

export default BusquedaPaciente;
