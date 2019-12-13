import * as moment from 'moment';

export const comparatorProm = (array: any[],days)=>{
    let data = [...array]
    let dates= [...days]
    let actualy: number=0
    let prev: number =0
    //let numDay = moment().weekday()
    //let monday = moment().subtract(numDay-1,"days").format("MM/DD/YYYY")
    //let lastMonday = moment(monday,"MM/DD/YYYY").subtract(1,"weeks").format("MM/DD/YYYY")
    //let lastNumDay =moment(lastMonday,"MM/DD/YYYY").add(numDay-1,"days").format("MM/DD/YYYY")
    let numDay = moment().format("MM/DD/YYYY")
    let monday = moment().subtract(6,"days").format("MM/DD/YYYY")
    let lastMonday = moment(monday,"MM/DD/YYYY").subtract(6,"days").format("MM/DD/YYYY")
    let lastNumDay =moment(monday,"MM/DD/YYYY").subtract(1,"days").format("MM/DD/YYYY")
    
    
    data.shift()
    dates.shift()
    dates.map((el,index)=>{
        if(el>=monday&&el!=null){
            actualy+=data[index]
        }
        if(el>=lastMonday&& el<=lastNumDay&&el!=null){
            prev+= data[index]
        }
        if(index==data.length-1){
            prev= prev/7
            actualy = actualy/7
        }
    })
    return parseFloat((((actualy*100)/prev)-100).toFixed(2))
}