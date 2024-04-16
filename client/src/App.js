import React, { Suspense } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';

import ProtectedRoute from './components/ProtectedRoute';
import LoginLoader from './components/ContentLoader/LoginLoader';

const Navbar = React.lazy(() => import('./components/Navbar'));
const Login = React.lazy(()=> import('./pages/Login'));
const Home = React.lazy(() => import('./pages/Home'));
const CalendarVisualizer = React.lazy(()=> import('./pages/CalendarVisualizer/CalendarVisualizer'));
const CalendarScheduler = React.lazy(()=> import('./pages/CalendarScheduler/CalendarScheduler'));
const CalendarModify = React.lazy(()=> import('./pages/CalendarModify/CalendarModify'));
const CheckPatientSchedule = React.lazy(()=> import('./pages/CheckPatientSchedule/CheckPatientSchedule'));
const ChangeHistory = React.lazy(()=> import('./pages/ChangeHistory/ChangeHistory'));

const App = () => {
  // Plantilla para incluir Navbar
  function GlobalTemplate(){
    return (
      <>
        <Navbar/>
        <Suspense fallback={<LoginLoader/>}>
          <Outlet/>
        </Suspense>
      </>
    )
  } 

  // De forma momentanea solo entra a rutas protegidas teniendo un token, pudiendo ser cualquiera.
  return (
    <Routes>
      <Route 
        path="/" 
        element={<Suspense fallback={<LoginLoader />}><Login /></Suspense>} 
      />
      {/* Rutas protegidas por el token */}
      <Route element={<ProtectedRoute />}>
        <Route element={<GlobalTemplate/>}>
          <Route path="/inicio" element={<Home />} />
          <Route path="/calendar-visualizacion" element={<CalendarVisualizer />} />
          <Route path="/calendar-ingreso-horas" element={<CalendarScheduler />} />
          <Route path="/calendar-modificacion" element={<CalendarModify />} />
          <Route path="/busqueda-por-paciente" element={<CheckPatientSchedule />} />
          <Route path="/historial-de-cambios" element={<ChangeHistory />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/inicio" />} />
    </Routes>
  )
}

export default App;