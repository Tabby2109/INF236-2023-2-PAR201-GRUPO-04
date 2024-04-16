import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './components/utils/ProtectedRoute';
import './App.css';

const Login = React.lazy(()=> import('./components/Login'));
const Inicio = React.lazy(() => import('./components/Inicio'));
const CalendarVisualizacion = React.lazy(()=> import('./components/CalendarVisualizacion/CalendarVisualizacion'));
const CalendarIngresoHoras = React.lazy(()=> import('./components/CalendarIngresoHoras/CalendarIngresoHoras'));
const CalendarModificacion = React.lazy(()=> import('./components/CalendarModificacion/CalendarModificacion'));
const BusquedaPaciente = React.lazy(()=> import('./components/BusquedaPaciente/BusquedaPaciente'));
const HistorialCambios = React.lazy(()=> import('./components/HistorialCambios/HistorialCambios'));

const App = () => {
  // De forma momentanea solo entra a rutas protegidas teniendo un token, pudiendo ser cualquiera.
  return (
    <Suspense fallback={<h1>Cargando...</h1>}>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Rutas protegidas por el token */}
        <Route element={<ProtectedRoute />}>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/calendar-visualizacion" element={<CalendarVisualizacion />} />
          <Route path="/calendar-ingreso-horas" element={<CalendarIngresoHoras />} />
          <Route path="/calendar-modificacion" element={<CalendarModificacion />} />
          <Route path="/busqueda-por-paciente" element={<BusquedaPaciente />} />
          <Route path="/historial-de-cambios" element={<HistorialCambios />} />
        </Route>
        <Route path="*" element={<Navigate to="/inicio" />} />
      </Routes>
    </Suspense>
  )
}

export default App;