import * as moment from 'moment';
import { datesForPeriod } from './datesForPeriod';


export const postDetailTrans = (data, limit = 7, period = "DL") => {
    let days = datesForPeriod(period, limit)
    return data.reduce((obj,e)=>{
        let index = days.findIndex(el=>moment(e.date).format("MM/DD/YYYY")==el)
        if(index>0){ 
            e.url= `https://www.youtube.com/embed/${e.media.value}`
            obj.push(e)
        }
        return obj
    },[])
}