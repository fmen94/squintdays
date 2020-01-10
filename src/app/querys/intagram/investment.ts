import * as moment from 'moment';

export const investment =(limit=7,period="DL")=>{

return`
query{
  pulse{
    instagram{
      investmentReturn{
        investment(limit:${limit} period: ${period}){
          date
          value
        }
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
      }
    }
  }
}
`
}