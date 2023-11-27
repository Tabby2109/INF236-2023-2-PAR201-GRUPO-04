import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import BarraSuperior from './BarraSuperior';
import Calendar from './calendar/Calendar';
import CalendarIngreso from './calendarIngreso/CalendarIngreso';

const IngresoHoras = () => {
  return (
    <div>
      <h2>Visualización horas</h2>
      <Link to="/calendarInicio" style={linkStyle}>
        Ir a Calendar
      </Link>
    </div>
  );
};


const VisualizacionHoras = () => (
  <div>
    <h2>Visualización horas</h2>
    <Link to="/calendar" style={linkStyle}>
      Ir a Calendar
    </Link>
  </div>
);

const ModificacionHoras = () => (
  <div>
    <h2>Modificación horas</h2>
    {/* Contenido de la página de Modificación horas */}
  </div>
);



//NOTA: CUIDADO CON LAS MAYUSCULAS EN LAS PROPIEDADES/PARAMETROS DE LOS COMPONENTES, REACT NO TE AVISA SI TIPEASTE MAL LA PROPIEDAD, SOLO LA IGNORA, FUE HORA Y MEDIA DE SUFRIMIENTO AYUDA
const Inicio = ({ token, setToken, OnLogout }) => (
  <div>
    <BarraSuperior token={token} setToken={setToken} OnLogout={OnLogout}/> 

    <div style={containerStyle}>
      <div style={triangleContainerStyle}>
        <Link to="/calendarIngreso" style={boxStyle}>
          Ingreso horas
        </Link>
        <div style={sideBoxesContainerStyle}>
          <Link to="/calendar" style={boxStyle}>
            Visualización horas
          </Link>
          <Link to="/modificacion-horas" style={boxStyle}>
            Modificación horas
          </Link>
        </div>
      </div>
  
      <Routes>
        
        <Route path="/modificacion-horas" element={<ModificacionHoras />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/calendarIngreso" element={<CalendarIngreso />} />

      </Routes>
    </div>
  </div>

);

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

const linkStyle = {
    textDecoration: 'none',
    color: 'blue',
    marginTop: '20px',  // Ajusta el margen superior según sea necesario
  };

export default Inicio;
