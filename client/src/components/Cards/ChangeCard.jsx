import moment from 'moment';

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