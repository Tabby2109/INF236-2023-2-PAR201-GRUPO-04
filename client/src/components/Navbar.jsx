import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginLoader from './ContentLoader/LoginLoader';

const Navbar = () => {
  const [unLogged, setUnLogged] = useState(false);
  const navigate = useNavigate();

  const HandleLogout = () => {
    // Elimina el token del estado para cerrar la sesión
    alert("Closed session");
    sessionStorage.removeItem('token');
    setUnLogged(true);
  };

  useEffect(()=>{
    if (unLogged){
      navigate('/');
    }
  }, [unLogged, navigate])
    
  return(
    <div style={navbarStyle}>
      <span style={nombreAppStyle}>Hospitapp</span>
      <button type="button" className='btn btn-dark ms-auto me-3' onClick={() => navigate('/busqueda-por-paciente')}>
        Búsqueda por paciente
      </button>
      <button type="button" className='btn btn-dark me-3' onClick={() => navigate('/historial-de-cambios')}>
        Historial de cambios
      </button>
      <button type="button" className='btn btn-dark me-3' onClick={() => navigate('/inicio')}>
        Volver al inicio
      </button>
      <button type="button" className='btn btn-danger' onClick={HandleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

const navbarStyle = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'black',
  padding: '24px 32px',
  textAlign: 'left',
  width: '100vw',
};

const nombreAppStyle = {
  color: 'white',
  fontSize: '1.5em',
};

export default Navbar;
