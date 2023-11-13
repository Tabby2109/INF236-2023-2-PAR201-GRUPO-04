import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import Inicio from './components/Inicio';
import { Routes, Route, Navigate, BrowserRouter as Router, useNavigate, } from 'react-router-dom';

const App = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  
  const HandleLogin = (userToken) => {
    // Almacena el token en el estado para manejar la autenticación
    setToken(userToken);
  };

  const HandleLogout = () => {
    // Elimina el token del estado para cerrar la sesión
    console.log("close session");
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
            <Route
              path="/"
              element={<LoginForm onLogin={HandleLogin} />}
            />
          </Routes>
      )}
    </div>
  );
};

export default App;