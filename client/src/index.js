import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Calendar from './components/calendar/Calendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inicio from './components/Inicio';

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/inicio" element={<Inicio />} />

    </Routes>
  </Router>,
  rootElement
);

reportWebVitals();
