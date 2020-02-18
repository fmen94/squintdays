import * as moment from 'moment';

export const community =(limit=7,period="DL")=>{

return`
query{
  pulse{
    instagram{
      community{
        newFans(limit:${limit} period: ${period}){
          date
          value
        }
        organicFans(limit:${limit} period: ${period}){
          date
          value
        }
        paidFans(limit:${limit} period: ${period}){
          date
          value
        }
      }
    }
  }
}

`
}