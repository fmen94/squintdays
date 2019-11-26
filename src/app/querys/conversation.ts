import * as moment from 'moment';

export const conversation =(limit=7,period="DL")=>{
let end =moment().format('MM/DD/YYYY')
let start = moment().subtract(limit,'days').format("MM/DD/YYYY")

return`
query{
  pulse{
    facebook{
       conversation{
      privateMessages(limit:${limit} period: ${period}){
        date
        value
      }
      }
    }
  }
}
`
}