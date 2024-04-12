import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

// import Calendar from './calendar/Calendar';
// import {Routes, Route, useNavigate } from 'react-router-dom';
// import CalendarIngreso from './calendarIngreso/CalendarIngreso';

// const ModificacionHoras = () => (
//   <div>
//     <h2>Modificación horas</h2>
//     {/* Contenido de la página de Modificación horas */}
//   </div>
// );

const Inicio = ({setToken, OnLogout }) => {
  const gettoken = sessionStorage.getItem('token');
  const token = JSON.parse(gettoken);
  return(
    <>
      <Navbar token={token} setToken={setToken} OnLogout={OnLogout}/> 
      <div style={containerStyle}>
        <div style={triangleContainerStyle}>
          <Link to="/calendar-ingreso-horas" style={boxStyle}>
            Ingreso de horas
          </Link>
          <div style={sideBoxesContainerStyle}>
            <Link to="/calendar-visualizacion" style={boxStyle}>
              Visualización de horas
            </Link>
            {/* Se debe agregar modificación de horas */}
            <Link to="/calendar-modificacion" style={boxStyle}>
              Modificación de horas
            </Link>
          </div>
        </div>

        {/* Cambiar rutas al app.js -> */}
        {/* <Routes>
          <Route path="/modificacion-horas" element={<ModificacionHoras token={token} setToken={setToken} OnLogout={OnLogout}/>} />
          <Route path="/calendar-ingreso-horas" element={<Calendar token={token} setToken={setToken} OnLogout={OnLogout}/>} />
          <Route path="/calendar-visualizacion" element={<CalendarIngreso token={token} setToken={setToken} OnLogout={OnLogout}/>} />
        </Routes> */}
      </div>
    </>
  )

};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
};

const triangleContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const boxStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '250px',
  width: '250px',
  background: 'green',
  borderRadius: '15px',
  margin: '20px', 
  textDecoration: 'none',
  color: 'white', 
  fontSize: '18px',
};

const sideBoxesContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
};

export default Inicio;
