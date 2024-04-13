import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import moment from 'moment';

const HistorialCambios = ({ setToken,OnLogout }) => {
  const gettoken = sessionStorage.getItem('token');
  const token = JSON.parse(gettoken);
  const [changesHistory, setChangesHistory] = useState([]);

  useEffect(()=>{
    const fetchChangesHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/historial/getChangesHistory', {
          headers: {
            'Authorization': `Bearer ${token}`
          }})
        const data = response.data;
        setChangesHistory(data);
      } catch(error) {
        console.log(error);
      }
    }  
    fetchChangesHistory();
  }, [token])

  return (
    <>
      <Navbar token={token} setToken={setToken} OnLogout={OnLogout}/> 
      <div className='container mt-5'>
        <h2>Historial de cambios</h2>
        <h5>Todo cambio quedará registrado aquí.</h5>
        {changesHistory && changesHistory.map((changes, index) => 
          <div key={changes._id} className='shadow p-2'>
            <h4>Cambio {index + 1}</h4>
            <p>RUT: {changes.usuario.rut}</p>
            <p>Nombre: {changes.usuario.nombre}</p>
            <p>Tipo de cambio: {changes.tipoCambio}</p>
            <p>Fecha y hora: {moment(changes.fecha).format("DD/MM/YYYY")} {moment(changes.fecha).format("HH:mm:ss")}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default HistorialCambios;
