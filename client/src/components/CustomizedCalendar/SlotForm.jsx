import React, { useState } from 'react';
import axios from 'axios';
import './formStyles.css';
import PropTypes from 'prop-types'

const SlotForm = ({ token, setShowModal, tipoExamen, fecha, handleClose }) => {
  const [formData, setFormData] = useState({
    rutPaciente: '',
    nombrePaciente: '',
    maquinaId: '',
    fecha: fecha,
    motivoEx: '',
    tipoEx: tipoExamen,
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
    axios.post('http://localhost:5000/citas/registrarCita', {
      rutPaciente: formData.rutPaciente,
      nombrePaciente: formData.nombrePaciente,
      maquinaId: formData.maquinaId,
      fecha: formData.fecha,
      contacto: formData.contacto,
      motivoEx: formData.motivoEx,
      tipoEx: formData.tipoEx,
      infoExtra: formData.infoExtra
    },{
      headers: {
        'Authorization': `Bearer ${token}`
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
      setShowModal(false);
      alert("registrada con éxito, los cambios se reflejarán una vez se recargue el calendario, dirijase a visualización");
      window.location.reload(true);
    })
    .catch(error => console.error('Error guardando cita:', error));
   };

  return (
    <form className="form-content">
      <div className='d-flex'>
        <label className='label-rut' htmlFor="rutPaciente">
          RUT:{' '}
          <input type="text" id="rutPaciente" name="rutPaciente" value={formData.rutPaciente} autoComplete="off" onChange={handleChange} />
        </label>
        <label className='label-nombre' htmlFor="nombrePaciente">
          Nombre:{' '}
          <input type="text" id="nombrePaciente" name="nombrePaciente" value={formData.nombrePaciente} autoComplete="off" onChange={handleChange} />
        </label>
      </div>
      
      <label htmlFor="motivoEx">
        Motivo:{' '}
        <textarea id="motivoEx" name="motivoEx" value={formData.motivoEx} onChange={handleChange} />
      </label>

      <div className='d-flex justify-content-start'>
        <label className='label-maquina' htmlFor="maquinaId">
          Máquina ID:{' '}
          <input type="text" id="maquinaId" name="maquinaId" value={formData.maquinaId} onChange={handleChange} />
        </label>
        <label className='label-contacto' htmlFor="contacto">
          Contacto:{' '}
          <input type="text" id="contacto" name="contacto" value={formData.contacto} autoComplete="off" onChange={handleChange} />
        </label>
      </div>

      <label className='label-info' htmlFor="infoExtra">
        Información extra:{' '}
        <textarea id="infoExtra" name="infoExtra" value={formData.infoExtra} onChange={handleChange} />
      </label>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Cerrar</button>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Agregar cita</button>
      </div>
    </form>
  )
}

SlotForm.propTypes = {
  token: PropTypes.string.isRequired,
  setShowModal: PropTypes.func.isRequired,
  tipoExamen: PropTypes.string.isRequired,
  fecha: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default SlotForm;
