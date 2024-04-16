import React, { useState } from 'react'
import axios from 'axios';
import { PendingAppointmentCard } from '../../components/Cards/PendingAppointmentCard';

const CheckPatientSchedule = ({setToken, OnLogout}) => {
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

  return (
    <>
      <div className='h-100'>
        <div className='container pt-5 pb-5 h-100'>
          <h2>Búsqueda avanzada</h2>
          <h5>Busca las citas pendientes del paciente.</h5>
          <p>Asegúrese de que el RUT/nombre esté completo. Recuerde que el RUT debe ser en formato ej. 12345678-9</p>
          <div className='d-flex'>
            <input
              className='form-control mr-sm-2 w-50'
              type="text"
              placeholder="Ingrese nombre o RUT"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <select className="form-select w-25" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
              <option value="placeholder">Seleccione una casilla</option>
              <option value="rut">Buscar por RUT</option>
              <option value="nombre">Buscar por nombre</option>
            </select>
            <button className="btn btn-success my-2 my-sm-0" onClick={handleSearch}>Buscar</button>
          </div>
          {(events != null && events.length === 0) && <p className='mt-2'>No existen citas pendientes.</p>}
          {events && 
            <div className='mt-3'>
              { events.map( (event, index)=> (
                <PendingAppointmentCard
                  event = {event}
                  index = {index}
                />
              ))}
            </div>}
        </div>
      </div>
    </>
  );
};

export default CheckPatientSchedule;
