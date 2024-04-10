import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSessionStorage } from 'react-use';

import Login from './components/Login';
import Inicio from './components/Inicio';
import Calendar from './components/calendar/Calendar';
import CalendarIngreso from './components/calendarIngreso/CalendarIngreso';
import ProtectedRoute from './components/utils/ProtectedRoute';

import './App.css';

const App = () => {
  // De forma momentanea solo entra a rutas protegidas teniendo un token, pudiendo ser cualquiera.
  const [token, setToken] = useSessionStorage('token');

  // Debo saber que el token es valido... Crear endpoint para checkear token!
  // useEffect(() => {
    
  // },[token])

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* Rutas protegidas por el token */}
      <Route element={<ProtectedRoute canActivate={token} />}>
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/calendarIngreso" element={<CalendarIngreso />} />
      </Route>
    </Routes>
  )
}

export default App;