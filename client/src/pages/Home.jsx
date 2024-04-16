import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Inicio = ({setToken, OnLogout }) => {
  const gettoken = sessionStorage.getItem('token');
  const token = JSON.parse(gettoken);
  return(
    <>
      <Navbar token={token} setToken={setToken} OnLogout={OnLogout}/> 
      <div className="background-color" style={containerStyle}>
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
