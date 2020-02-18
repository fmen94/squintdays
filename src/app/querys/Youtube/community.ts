import * as moment from 'moment';

export const community =(limit=7,period="DL")=>{

return`
query{
  pulse{
    youtube{
      community{
        unsubscribers(limit:${limit} period: ${period}) {
          date
          value
        }
      }
    }
  }
}

`
}