import React from 'react';
import { Link } from 'react-router-dom';
import { Routes, Route, Navigate, BrowserRouter as Router, useNavigate, } from 'react-router-dom';

const BarraSuperior = ({ token, setToken, OnLogout }) => {
  const navigate = useNavigate();

  const HandleLogout = () => {
    // Elimina el token del estado para cerrar la sesión
    alert("Closed session");
    sessionStorage.removeItem('token');
    
    navigate('/');
    window.location.reload(true);
  };
    
  return(<div style={barraSuperiorStyle}>
    <span style={nombreAppStyle}>Hospitapp</span>
    <Link to="/Inicio" style={volverAlInicioStyle}>Volver al inicio</Link>
    <button onClick={HandleLogout} style={cerrarSesionStyle}>
      Cerrar sesión
    </button>
  </div>);
};

const barraSuperiorStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: 'black',
  padding: '20px',
  textAlign: 'left',
  width: '100%',
};

const nombreAppStyle = {
  color: 'white',
  fontSize: '1.5em',
};

const volverAlInicioStyle = {
  color: 'white',
  textDecoration: 'none',
  marginRight: '20px', // Ajusta el margen según sea necesario
};

const cerrarSesionStyle = {
  backgroundColor: 'red',
  color: 'white',
  padding: '11px',
  borderRadius: '100px',
  cursor: 'pointer',
};

export default BarraSuperior;
