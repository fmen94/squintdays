import * as moment from 'moment';

export const conversation =(limit=7,period="DL")=>{

return`
query {
  pulse {
    instagram {
      conversation {
        privateMessages(limit:${limit} period: ${period}) {
          date
          value
        }
        comments(limit:${limit} period: ${period}) {
          date
          value
        }
      }
    }
  }
}

`
}