import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Inicio from './components/Inicio';
import CalendarVisualizacion from './components/CalendarVisualizacion/CalendarVisualizacion';
import CalendarIngresoHoras from './components/CalendarIngresoHoras/CalendarIngresoHoras';
import CalendarModificacion from './components/CalendarModificacion/CalendarModificacion';
import ProtectedRoute from './components/utils/ProtectedRoute';

import './App.css';

const App = () => {
  // De forma momentanea solo entra a rutas protegidas teniendo un token, pudiendo ser cualquiera.
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* Rutas protegidas por el token */}
      <Route element={<ProtectedRoute />}>
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/calendar-visualizacion" element={<CalendarVisualizacion />} />
        <Route path="/calendar-ingreso-horas" element={<CalendarIngresoHoras />} />
        <Route path="/calendar-modificacion" element={<CalendarModificacion />} />
      </Route>
      <Route path="*" element={<Navigate to="/inicio" />} />
    </Routes>
  )
}

export default App;