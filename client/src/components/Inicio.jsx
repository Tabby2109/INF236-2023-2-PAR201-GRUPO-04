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

//NOTA: CUIDADO CON LAS MAYUSCULAS EN LAS PROPIEDADES/PARAMETROS DE LOS COMPONENTES, REACT NO TE AVISA SI TIPEASTE MAL LA PROPIEDAD, SOLO LA IGNORA, FUE HORA Y MEDIA DE SUFRIMIENTO AYUDA
const Inicio = ({setToken, OnLogout }) => {
  const gettoken = sessionStorage.getItem('token');
  const token = JSON.parse(gettoken);
  return(
    <div>
      <Navbar token={token} setToken={setToken} OnLogout={OnLogout}/> 
      <div style={containerStyle}>
        <div style={triangleContainerStyle}>
          <Link to="/calendar-ingreso-horas" style={boxStyle}>
            Ingreso horas
          </Link>
          <div style={sideBoxesContainerStyle}>
            <Link to="/calendar-visualizacion" style={boxStyle}>
              Visualización horas
            </Link>
            {/* Se debe agregar modificación de horas */}
            <Link to="/modificacion-horas" style={boxStyle}>
              Modificación horas
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
    </div>
  )

};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // Ajusta la altura al 100% de la ventana visible
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
  height: '250px', // Igualado el tamaño
  width: '250px', // Igualado el tamaño
  background: 'green', // Color azul más intenso
  borderRadius: '15px',
  margin: '80px', // Reducida la distancia
  textDecoration: 'none',
  color: 'white', // Texto en color blanco
};

const sideBoxesContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
};

export default Inicio;
