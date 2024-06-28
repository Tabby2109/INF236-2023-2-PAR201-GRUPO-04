import moment from 'moment';
import PropTypes from 'prop-types'
import { calcDiff } from '../../utilities/calc-diff-dates.utility';

export const PendingAppointmentCard = ({ event, index }) =>{
  let date = moment(event.fecha).format('DD/MM/YYYY');
  let duration = calcDiff(event.fecha, event.fin);

  return(
    <div className="shadow p-3 m-2" key={event._id}>
      <h3>Cita {index + 1}</h3>
      <p>RUT: {event.rutPaciente}</p>
      <p>Paciente: {event.nombrePaciente}</p>
      <p>Fecha: {date}</p>
      <p>Hora: {event.hora}</p>
      <p>Contacto: {event.contacto}</p>
      <p>Tipo de examen: {event.tipoEx}</p>
      <p>Motivo: {event.motivoEx}</p>
      <p>Información extra: {event.infoExtra}</p>
      <p>Duración: {duration}</p>
    </div>
  )
}
const eventPropTypes = {
  _id: PropTypes.string.isRequired,
  fecha: PropTypes.string.isRequired,
  fin: PropTypes.string.isRequired,
  rutPaciente: PropTypes.string.isRequired,
  nombrePaciente: PropTypes.string.isRequired,
  hora: PropTypes.string.isRequired,
  contacto: PropTypes.string.isRequired,
  tipoEx: PropTypes.string.isRequired,
  motivoEx: PropTypes.string.isRequired,
  infoExtra: PropTypes.string.isRequired,
};

PendingAppointmentCard.propTypes = {
  event: PropTypes.shape(eventPropTypes).isRequired,
  index: PropTypes.number.isRequired
}