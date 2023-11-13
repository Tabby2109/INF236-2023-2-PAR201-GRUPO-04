import React from 'react';

const BarraSuperior = ({ token, setToken, HandleLogout }) => (
  <div style={barraSuperiorStyle}>
    <span style={nombreAppStyle}>Hospitapp</span>
    <button onClick={HandleLogout} style={cerrarSesionStyle}>
      Cerrar sesión
    </button>
  </div>
);

const barraSuperiorStyle = {
    display: 'flex',        // Add this line
    justifyContent: 'space-between',   // Add this line
    backgroundColor: 'gray',
    padding: '20px',
    textAlign: 'left',
    width: '100%', // Ocupar el ancho completo
  };

const nombreAppStyle = {
  color: 'white',
  fontSize: '1.5em',
};

const cerrarSesionStyle = {
  marginLeft: 'auto', // Mueve el botón al extremo derecho
  backgroundColor: 'red',
  color: 'white',
  padding: '10px',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default BarraSuperior;