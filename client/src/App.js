import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const Login = React.lazy(()=> import('./pages/Login'));
const Home = React.lazy(() => import('./pages/Home'));
const CalendarVisualizer = React.lazy(()=> import('./pages/CalendarVisualizer/CalendarVisualizer'));
const CalendarScheduler = React.lazy(()=> import('./pages/CalendarScheduler/CalendarScheduler'));
const CalendarModify = React.lazy(()=> import('./pages/CalendarModify/CalendarModify'));
const CheckPatientSchedule = React.lazy(()=> import('./pages/CheckPatientSchedule/CheckPatientSchedule'));
const ChangeHistory = React.lazy(()=> import('./pages/ChangeHistory/ChangeHistory'));

const App = () => {
  // De forma momentanea solo entra a rutas protegidas teniendo un token, pudiendo ser cualquiera.
  return (
    <Suspense fallback={<body className='background-color'><h1>Cargando...</h1></body>}>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Rutas protegidas por el token */}
        <Route element={<ProtectedRoute />}>
          <Route path="/inicio" element={<Home />} />
          <Route path="/calendar-visualizacion" element={<CalendarVisualizer />} />
          <Route path="/calendar-ingreso-horas" element={<CalendarScheduler />} />
          <Route path="/calendar-modificacion" element={<CalendarModify />} />
          <Route path="/busqueda-por-paciente" element={<CheckPatientSchedule />} />
          <Route path="/historial-de-cambios" element={<ChangeHistory />} />
        </Route>
        <Route path="*" element={<Navigate to="/inicio" />} />
      </Routes>
    </Suspense>
  )
}

export default App;