import * as moment from 'moment';

export const content =(limit=60)=>{
  let end =moment().format('MM/DD/YYYY')
  let start = moment().subtract(limit,'days').format("MM/DD/YYYY")
  
return`
query{
  pulse{
    news{
      post(limit:50,dateStartEnd:{start: "${start}", end:"${end}"}){
        note_image{
          kind
          value
        }
        post_text
        date
      }
    }
  }
}

`
}