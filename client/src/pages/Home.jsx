import React from 'react';
import { Link } from 'react-router-dom';
import { PrivateRoutes } from '../navigation/routes';

const Inicio = () => {
  return(
    <div className="background-color" style={containerStyle}>
      <div style={triangleContainerStyle}>
        <Link replace to={`/${PrivateRoutes.CALENDAR}`} style={boxStyle}>
          Calendario
        </Link>
        <div style={sideBoxesContainerStyle}>
          <Link replace to={`/${PrivateRoutes.CHECKPATIENTSCHEDULE}`} style={boxStyle}>
            Búsqueda por paciente
          </Link>
          <Link replace to={`/${PrivateRoutes.CHANGEHISTORY}`} style={boxStyle}>
            Historial de cambios
          </Link>
        </div>
      </div> 
    </div>
  )
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
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
  background: 'linear-gradient(to top, #09203f 0%, #537895 100%)',
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
