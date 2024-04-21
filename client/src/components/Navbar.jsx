import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from '../models/routes';

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
      navigate(PublicRoutes.LOGIN);
    }
  }, [unLogged, navigate])
    
  return(
    <div style={navbarStyle}>
      <span style={nombreAppStyle}>Hospitapp</span>
      {/* <button type="button" className='btn btn-dark ms-auto me-3' onClick={() => navigate(PrivateRoutes.CHECKPATIENTSCHEDULE)}>
        Búsqueda por paciente
      </button>
      <button type="button" className='btn btn-dark me-3' onClick={() => navigate(PrivateRoutes.CHANGEHISTORY)}>
        Historial de cambios
      </button> */}
      <button type="button" className='btn btn-dark ms-auto me-3' onClick={() => navigate(PrivateRoutes.HOME)}>
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
