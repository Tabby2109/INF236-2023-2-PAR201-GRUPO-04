import React, { useState } from 'react';
import axios from 'axios';
import { Routes, Route, BrowserRouter as Router, useNavigate, } from 'react-router-dom';

const SimpleForm = ({hora, setShowForm}) => {
  const gettoken = sessionStorage.getItem('token');
  const nowtoken = JSON.parse(gettoken);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rutPaciente: '',
    nombrePaciente: '',
    maquinaId: '',
    fecha: '',
    motivoEx: '',
    tipoEx: '',
    contacto: '',
    infoExtra: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(hora);
    axios.post('http://localhost:5000/citas/registrarCita', {
      
      rutPaciente: formData.rutPaciente,
      nombrePaciente: formData.nombrePaciente,
      maquinaId: formData.maquinaId,
      fecha: hora,
      contacto: formData.contacto,
      motivoEx: formData.motivoEx,
      tipoEx: formData.tipoEx,
      infoExtra: formData.infoExtra
    },{
      headers: {
        'Authorization': `Bearer ${nowtoken}`
      }
    } )
    .then(response => {
      console.log('Cita guardada con exito:', response.data);
      setFormData({
        rutPaciente: '',
        nombrePaciente: '',
        maquinaId: '',
        fecha: '',
        contacto: '',
        motivoEx: '',
        tipoEx: '',
        infoExtra: ''
      });
      setShowForm(false);
      alert("registrada con éxito, los cambios se reflejarán una vez se recargue el calendario, dirijase a visualización");
      window.location.reload(true);
      console.log(hora);
    })
    .catch(error => console.error('Error guardando cita:', error));
   };
   

  return (
    <div className="form-overlay">
        <div className="form-content">

        <div>
          <h2>{hora && hora.hora}</h2>
          <form onSubmit={handleSubmit}>       
            <label>
            RUT:
            <input type="text" name="rutPaciente" value={formData.rutPaciente} onChange={handleChange} />
            </label>
            <br />
            <label>
            Nombre:
            <input type="text" name="nombrePaciente" value={formData.nombrePaciente} onChange={handleChange} />
            </label>
            <br />
            <label>
            Máquina ID:
            <input type="text" name="maquinaId" value={formData.maquinaId} onChange={handleChange} />
            </label>
            <br />
            <label>
            Motivo:
            <textarea name="motivoEx" value={formData.motivoEx} onChange={handleChange} />
            </label>
            <br />
            <label>
            Tipo:
            <input type="text" name="tipoEx" value={formData.tipoEx} onChange={handleChange} />
            </label>
            <br />
            <label>
            Contacto:
            <input type="text" name="contacto" value={formData.contacto} onChange={handleChange} />
            </label>
            <br />
            <label>
            Información extra:
            <textarea name="infoExtra" value={formData.infoExtra} onChange={handleChange} />
            </label>
            <br />
            <button className="cancel-button" onClick={() => setShowForm(false)}>Cancelar</button>
            <button className="submit-button" onClick={handleSubmit}>Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SimpleForm;