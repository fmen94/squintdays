import * as moment from 'moment';

export const content =(limit=7,period="DL")=>{
let end =moment().format('MM/DD/YYYY')
let start = moment().subtract(limit,'days').format("MM/DD/YYYY")

return`
# Write your query or mutation here
query {
  pulse {
    facebook {
      content {
        post (limit: 50){
          date
          text
          media {
            kind
            value
          }
        }
      }
    }
  }
}


`
}