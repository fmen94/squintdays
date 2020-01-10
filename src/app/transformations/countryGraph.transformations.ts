import * as moment from 'moment';
import { datesForPeriod } from './datesForPeriod';


export const countryGraph = (data, limit = 7, period = "DL") => {

    let result: any = []
    let days = datesForPeriod(period, limit)
   let empty = []
   for (let index = 0; index < limit; index++) {
    empty.push(null)
       
   }
    result =data.reduce((arr,e)=>{    
        let index = days.findIndex(el=>el==moment(e.date.substr(0,10)).format("MM/DD/YYYY"))
        let newIndex = arr.findIndex(el=>el[0]==(e.name.charAt(0).toUpperCase() + e.name.slice(1,40)).replace("https://",""))
        if(index>=0 && newIndex>=0){
            arr[newIndex][index]= e.value
        }
        else if(index>=0){
            arr.push([(e.name.charAt(0).toUpperCase() + e.name.slice(1,40)).replace("https://",""),...empty])
            arr[arr.length-1][index]=e.value
        }
        else if (newIndex==-1){
            arr.push([(e.name.charAt(0).toUpperCase() + e.name.slice(1,40)).replace("https://",""),...empty])
        }
        
        return arr
    },[])
    result.unshift(days)    
return result
}