import moment from 'moment'

export function calcDiff(date1, date2){
    let initial = new Date(date1);
    let final = new Date(date2);

    // diff está en milisegundos
    let diff = final - initial;
    let hhmm = moment.duration(diff);
    return hhmm.hours() + " horas y " + hhmm.minutes() + " minutos."
  }