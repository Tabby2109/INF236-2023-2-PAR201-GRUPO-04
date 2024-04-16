import moment from 'moment';

export const PendingAppointmentCard = ({event, index}) =>{
  function calcDiff(date1, date2){
    var initial = new Date(date1);
    var final = new Date(date2);

    // diff está en milisegundos
    var diff = final - initial;
    var hhmm = moment.duration(diff);
    return hhmm.hours() + " horas y " + hhmm.minutes() + " minutos."
  }

  let date = moment(event.fecha).format('DD/MM/YYYY');
  let duration = calcDiff(event.fecha, event.fin);

  return <>
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
  </>
}