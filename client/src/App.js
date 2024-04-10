import React, { useEffect, useState } from 'react';
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
  const [token, setToken] = useState(null);

  useEffect(()=>{
    if (sessionStorage.getItem('token') != null){
      setToken(sessionStorage.getItem('token'));
    }
  }, [token])

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