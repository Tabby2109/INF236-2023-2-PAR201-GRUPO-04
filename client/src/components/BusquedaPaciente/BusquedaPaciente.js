import React, { useState } from 'react'
import Navbar from '../Navbar';
import axios from 'axios';
import "./BusquedaPacienteStyles.css";

const BusquedaPaciente = ({setToken, OnLogout}) => {
  const gettoken = sessionStorage.getItem('token');
  const token = JSON.parse(gettoken);
  const [events, setEvents] = useState('');

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
      <Navbar token={token} setToken={setToken} OnLogout={OnLogout}/>
      <div className='bg-light vh-100'>
        <div className='container pt-5'>
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
          {events && 
            <div>
              { events.map( event => (
                <div className="shadow" key={event._id}>
                  <p>{event.nombrePaciente}</p>
                  <p>{event.fecha}</p>
                  <p>{event.hora}</p>
                </div>
              )
              )}
            </div>}
          
        </div>
      </div>
    </>
  );
};

export default BusquedaPaciente;
