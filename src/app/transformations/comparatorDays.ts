import * as moment from 'moment';
//compara los valores sumados de una semana para atras contra la semana anterior 
export const comparator = (array: any[],days)=>{
    let data = [...array]
    let dates= [...days]
    let actualy: number=0
    let prev: number =0
    let monday = moment().subtract(6,"days").format("MM/DD/YYYY")
    let lastMonday = moment(monday,"MM/DD/YYYY").subtract(7,"days").format("MM/DD/YYYY")
    let lastNumDay =moment(monday,"MM/DD/YYYY").subtract(1,"days").format("MM/DD/YYYY")
    //monday va 7 dias hacia atras 
    //lastMonday inicio de la mana anterior
    //lastNumDay frin de la semana anterior
    data.shift()
    dates.shift()
    dates.map((el,index)=>{
        if(new Date(el) >=new Date(monday)&&el!=null){
            actualy+=data[index]
        }
        if(new Date(el)>=new Date(lastMonday) && new Date(el)<=new Date(lastNumDay)&&el!=null){
            prev+= data[index]
        }
    })
    
    return  prev>0 && actualy>0? parseFloat((((actualy*100)/prev)-100).toFixed(2)): null
}