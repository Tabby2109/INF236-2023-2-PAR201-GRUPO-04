import React, { useState } from 'react';
import axios from 'axios';
import './formStyles.css';
import PropTypes from 'prop-types'

const EventForm = ({ token, setShowModal, data, handleClose }) => {
  const [form_data, set_form_data] = useState({
    rut: data.rutPaciente,
    nombre: data.nombrePaciente,
    motivoEx: data.motivoEx,
    maquinaId: data.maquinaId.index,
    contacto: data.contacto,
    infoExtra: data.infoExtra
  })

  const original = {
    rut: data.rutPaciente,
    nombre: data.nombrePaciente,
    motivoEx: data.motivoEx,
    maquinaId: data.maquinaId.index,
    contacto: data.contacto,
    infoExtra: data.infoExtra
  }

  const [modified, setModified] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    set_form_data((prevData) => ({
      ...prevData,
      [name]: value
    }));


  if (String(value) !== String(original[name])) {
    // Si el campo se modifica, entonces lo incluye en el array de Modified
    if (!modified.includes(name)) {
      setModified([...modified, name]);
    }
  } else {
    // Saca el valor del array en caso de que ya esté en Modified
    if (modified.includes(name)) {
      setModified(modified.filter(item => item !== name));
    }
  }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const modifiedData = {};
      modified.forEach((field) => {
        modifiedData[field] = form_data[field];
    });
    console.log(data)
    axios.patch(`http://localhost:5000/citas/modificarCita/${data._id}`, modifiedData,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    } )
    .then(response => {
      setShowModal(false);
      alert("Modificación realizada");
      window.location.reload(true);
    })
    .catch(error => console.error('Error modificando cita:', error));
  }

  const handleDeleteEvent = (e) => {
    axios.delete(`http://localhost:5000/citas/eliminarCita/${data._id}`,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    } )
    .then(response => {
      setShowModal(false);
      alert("Cita eliminada");
      window.location.reload(true);
    })
    .catch(error => console.error('Error eliminando cita:', error));
  }

  return (
    <form className="form-content">
      <div className='d-flex'>
        <label className='label-rut' htmlFor="rut">
          RUT {modified.includes("rut") && ("(*)")}:
          <input type="text" id="rut" name="rut" value={form_data.rut} placeholder={form_data.rut} autoComplete="off" onChange={handleChange} />
        </label>
        <label className='label-nombre' htmlFor="nombre">
          Nombre {modified.includes("nombre") && ("(*)")}:
          <input type="text" id="nombre" name="nombre" value={form_data.nombre} autoComplete="off" onChange={handleChange} />
        </label>
      </div>
      
      <label htmlFor="motivoEx">
        Motivo {modified.includes("motivoEx") && ("(*)")}:
        <textarea id="motivoEx" name="motivoEx" value={form_data.motivoEx} onChange={handleChange} />
      </label>

      <div className='d-flex justify-content-start'>
        <label className='label-maquina' htmlFor="maquinaId">
          Máquina ID {modified.includes("maquinaId") && ("(*)")}:
          <input type="text" id="maquinaId" name="maquinaId" value={form_data.maquinaId} onChange={handleChange} />
        </label>
        <label className='label-contacto' htmlFor="contacto">
          Contacto {modified.includes("contacto") && ("(*)")}:
          <input type="text" id="contacto" name="contacto" value={form_data.contacto} autoComplete="off" onChange={handleChange} />
        </label>
      </div>

      <label className='label-info' htmlFor="infoExtra">
        Información extra {modified.includes("infoExtra") && ("(*)")}: 
        <textarea id="infoExtra" name="infoExtra" value={form_data.infoExtra} onChange={handleChange} />
      </label>

      <div className="modal-footer">
        <button type="button" className="btn btn-secondary w-25" data-bs-dismiss="modal" onClick={handleClose}>Cerrar</button>
        <button type="button" className="btn btn-danger" onClick={handleDeleteEvent}>Eliminar cita</button>
        <button type="button" className="btn btn-warning" onClick={handleSubmit}>Modificar</button>
      </div>
    </form>
  )
}

const dataShapeTypes ={
  _id: PropTypes.string.isRequired,
  rutPaciente: PropTypes.string.isRequired,
  nombrePaciente: PropTypes.string.isRequired,
  motivoEx: PropTypes.string.isRequired,
  maquinaId: PropTypes.shape({ index: PropTypes.number.isRequired }),
  contacto: PropTypes.string.isRequired,
  infoExtra: PropTypes.string.isRequired,
}

EventForm.propTypes = {
  token: PropTypes.string.isRequired,
  setShowModal: PropTypes.func.isRequired,
  data: PropTypes.shape(dataShapeTypes).isRequired,
  handleClose: PropTypes.func.isRequired
};

export default EventForm;
