import moment from 'moment';
import PropTypes from 'prop-types';

export const ChangeCard = ({ data, index }) => {
    let fecha = moment(data.fecha).format("DD/MM/YYYY");
    let hora = moment(data.fecha).format("HH:mm:ss");
    return (
      <div key={data._id} className='shadow p-2'>
        <h4>Cambio {index + 1}</h4>
        <p>RUT: {data.usuario.rut}</p>
        <p>Nombre: {data.usuario.nombre}</p>
        <p>Tipo de cambio: {data.tipoCambio}</p>
        <p>Fecha y hora: {fecha} {hora}</p>
      </div>
    )
}

const userShape = PropTypes.shape({
  rut: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
});

const dataShape = {
  _id: PropTypes.string.isRequired,
  usuario: userShape.isRequired,
  tipoCambio: PropTypes.string.isRequired,
  fecha: PropTypes.string.isRequired,
};

ChangeCard.propTypes = {
  data: PropTypes.shape(dataShape).isRequired,
  index: PropTypes.number.isRequired,
};