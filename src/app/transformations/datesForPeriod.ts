import * as moment from 'moment';
export const datesForPeriod =(period,limit)=>{

 limit= limit-1
    let end 
    let start
    let days: any[] = ["Variable"]
    if(period == 'DL'){
        end = moment().format("MM/DD/YYYY")
        start = moment().subtract(limit,'days')
        while (new Date(start.format("MM/DD/YYYY")) <= new Date(end)) {
          
            days.push(start.format("MM/DD/YYYY"))
            start = start.add(1, 'days')
        }
    }
    else if(period == 'MT') {
        end = moment()
        start=moment().subtract(limit,"months").date(1)
         while (new Date(start) <=  new Date(end)) {
             days.push(start.format("MM/DD/YYYY"))
             start = start.add(1, 'months')
             
        
         }     
    }
    else if(period == 'QR'){
        start= moment().subtract(limit,"quarters").date(1)
        end = moment()
     
         while (new Date(start) <=  new Date(end)) {
             days.push(start.format("MM/DD/YYYY"))
             start = start.add(1, 'quarters')
                
        
         }   
    }
    else if(period == 'Wk'){
        start= moment().subtract(limit,"weeks").weekday(1)
        end = moment()
     
         while (new Date(start) <=  new Date(end)) {
             days.push(start.format("MM/DD/YYYY"))
             start = start.add(1, 'weeks')
                
        
         }   
    }
    else if(period == 'YR'){     
        start= moment().subtract(limit,"years").date(1).month(0)
        end = moment()
     
         while (new Date(start) <=  new Date(end)) {
             days.push(start.format("MM/DD/YYYY"))
             start = start.add(1, 'years')
                
        
         }  
        
    }
    return days
}