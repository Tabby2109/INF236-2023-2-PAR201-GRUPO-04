import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import Inicio from './components/Inicio';
import { Routes, Route, Navigate, BrowserRouter as Router, useNavigate, } from 'react-router-dom';
import './App.css';
import Calendar from './components/calendar/Calendar';

const App = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  
  const HandleLogin = (userToken) => {
    // Almacena el token en el estado para manejar la autenticación
    setToken(userToken);
  };

  const HandleLogout = () => {
    // Elimina el token del estado para cerrar la sesión
    alert("close session");
    setToken(null);
    navigate('/');
    //window.location.href='';
  };

  return (
    <div>
      {token ? (
        //<div>
        //  <h2>Bienvenido</h2>
        //  <button onClick={handleLogout}>Cerrar Sesión</button>
        <Inicio token={token} setToken={setToken} OnLogout={HandleLogout} />
        //</div>
      ) : (
        <Routes>
            <Route path="/" element={<LoginForm onLogin={HandleLogin} />} />
            <Route path="/calendar" element={<Calendar token={token} setToken={setToken} OnLogout={HandleLogout}/>} />
            <Route path="/inicio" element={<Inicio token={token} setToken={setToken} OnLogout={HandleLogout}/>} />

          </Routes>
      )}
    </div>
  );
};

export default App;