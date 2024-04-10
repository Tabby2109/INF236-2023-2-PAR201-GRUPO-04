import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const SimpleForm = ({hora, setShowForm}) => {
  const gettoken = sessionStorage.getItem('token');
  const nowtoken = JSON.parse(gettoken);
  // const navigate = useNavigate();
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
        <h2>{hora && hora.hora}</h2>
        <form onSubmit={handleSubmit}>
          <div className='d-flex'>
            <label className='label-rut'>
              RUT:
              <input type="text" name="rutPaciente" value={formData.rutPaciente} onChange={handleChange} />
            </label>
            <label className='label-nombre'>
              Nombre:
              <input type="text" name="nombrePaciente" value={formData.nombrePaciente} onChange={handleChange} />
            </label>
          </div>
          
          <label>
            Motivo:
            <textarea name="motivoEx" value={formData.motivoEx} onChange={handleChange} />
          </label>

          <div className='d-flex'>
            <label className='label-maquina'>
              Máquina ID:
              <input type="text" name="maquinaId" value={formData.maquinaId} onChange={handleChange} />
            </label>
            <label className='label-tipo'>
              Tipo de examen:
              <input type="text" name="tipoEx" value={formData.tipoEx} onChange={handleChange} />
            </label>
            <label className='label-contacto'>
            Contacto:
            <input type="text" name="contacto" value={formData.contacto} onChange={handleChange} />
          </label>

          </div>

          <label className='label-info'>
            Información extra:
            <textarea name="infoExtra" value={formData.infoExtra} onChange={handleChange} />
          </label>

          <button type="button" className="btn btn-danger me-3 " onClick={() => setShowForm(false)}>Cancelar</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default SimpleForm;