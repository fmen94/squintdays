import * as moment from 'moment';

export const investment =(limit=7,period="DL")=>{
let end =moment().format('MM/DD/YYYY')
let start = moment().subtract(limit,'days').format("MM/DD/YYYY")

return`
query {
  pulse {
    facebook {
     investmentReturn{
        campaignFrequency(limit:${limit} period: ${period}){
          date
          value
        }
        campaignReach(limit:${limit} period: ${period}){
          date
          value
        }
        relevanceScore(limit:${limit} period: ${period}){
          date
          value
        }
        campaignCtr(limit:${limit} period: ${period}){
          date
          value
        }
      }
    }
  }
}

`
}