import * as moment from 'moment';

export const community =(limit=7,period="DL")=>{
let end =moment().format('MM/DD/YYYY')
let start = moment().subtract(limit,'days').format("MM/DD/YYYY")

return`
query {
  pulse {
    facebook {
      community {
        viralFans(limit:${limit} period: ${period}) {
          date
          value
        }
        organicFans(limit:${limit} period: ${period}) {
          date
          value
        }
        paidFans(limit:${limit} period: ${period}) {
          date
          value
        }
      }
    }
  }
}
`
}