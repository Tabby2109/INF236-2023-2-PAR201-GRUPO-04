import React, { useState } from 'react';
import axios from 'axios';

const SimpleForm = ({hora, setShowForm}) => {
  const gettoken = sessionStorage.getItem('token');
  const nowtoken = JSON.parse(gettoken);

  const tiposExamen = ["Radiografía", "Scanner","Ecografía","Resonancia"]
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
            <label className='label-rut' htmlFor="rutPaciente">
              RUT:
              <input type="text" id="rutPaciente" name="rutPaciente" value={formData.rutPaciente} autoComplete="off" onChange={handleChange} />
            </label>
            <label className='label-nombre' htmlFor="nombrePaciente">
              Nombre:
              <input type="text" id="nombrePaciente" name="nombrePaciente" value={formData.nombrePaciente} autoComplete="off" onChange={handleChange} />
            </label>
          </div>
          
          <label htmlFor="motivoEx">
            Motivo:
            <textarea id="motivoEx" name="motivoEx" value={formData.motivoEx} onChange={handleChange} />
          </label>

          <div className='d-flex align-items-center
          justify-content-center'>
            <label className='label-maquina' htmlFor="maquinaId">
              Máquina ID:
              <input type="text" id="maquinaId" name="maquinaId" value={formData.maquinaId} onChange={handleChange} />
            </label>
            {/* <label className='label-tipo'>
              Tipo de examen:
              <input type="text" name="tipoEx" value={formData.tipoEx} onChange={handleChange} />
            </label> */}
            <label className='label-tipo' htmlFor="tipoEx">
              Tipo de examen:
              <select className='form-select' id="tipoEx" name="tipoEx" value={formData.tipoEx} onChange={handleChange}>
                <option defaultValue>Seleccione un tipo</option>
                { tiposExamen.map(examen => <option key={examen} value={examen}>{examen}</option>)}
              </select>
            </label>
            <label className='label-contacto' htmlFor="contacto">
              Contacto:
              <input type="text" id="contacto" name="contacto" value={formData.contacto} autoComplete="off" onChange={handleChange} />
            </label>

          </div>

          <label className='label-info' htmlFor="infoExtra">
            Información extra:
            <textarea id="infoExtra" name="infoExtra" value={formData.infoExtra} onChange={handleChange} />
          </label>

          <button type="button" className="btn btn-danger me-3 " onClick={() => setShowForm(false)}>Cancelar</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default SimpleForm;