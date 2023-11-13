import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Realizar solicitud al servidor para iniciar sesión
      const response = await axios.post('http://localhost:5000/api/login', {
        rut,
        password,
      });

      // Si la autenticación es exitosa, almacenar el token en el estado del padre
      onLogin(response.data.token);
    } catch (error) {
      console.error('Error de inicio de sesión:', error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Rut:
        <input type="text" value={rut} onChange={(e) => setRut(e.target.value)} />
      </label>
      <br />
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default LoginForm;