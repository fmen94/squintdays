import * as moment from 'moment';

export const comparatorActualy = (array: any[],days)=>{
    let data = [...array]
    let dates= [...days]
    let actualy=dates.findIndex(e=>e==moment().format("MM/DD/YYYY"))   
    let prev = dates.findIndex(e=>e== moment().subtract(7,'days').format("MM/DD/YYYY"))
    actualy= data[actualy]
    prev = data[prev]
    
    
    return prev>0 && actualy>0? parseFloat((((actualy*100)/prev)-100).toFixed(2)) : 0
}