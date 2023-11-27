import React, { useState } from 'react';

const SimpleForm = ({hora, setShowForm}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
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
    // Aquí puedes realizar acciones con los datos del formulario, como enviarlos a un servidor
    //console.log('Datos del formulario:', formData);
    // También puedes restablecer el formulario después de enviar los datos
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    setShowForm(false);
    console.log(hora);
  };

  return (
    <div className="form-overlay">
        <div className="form-content">

        <div>
          <h2>{hora && hora.hora}</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Nombre:
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <br />
            <label>
              Correo Electrónico:
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <br />
            <label>
              Mensaje:
              <textarea name="message" value={formData.message} onChange={handleChange} />
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