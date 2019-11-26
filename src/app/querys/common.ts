import * as moment from 'moment';

export const common =(limit=7,period="DL")=>{
let end =moment().format('MM/DD/YYYY')
let start = moment().subtract(limit,'days').format("MM/DD/YYYY")

return`
query{
    pulse{
      facebook{
         common{
          sentiment(dateStartEnd:{start:"${start}",end:"${end}"}){
            date
            bad
            good
            neutral
          }
          engagedUser(limit:${limit} period: ${period}){
            date
            value
          }
          engagementRate(limit:${limit} period: ${period}){
            date
            value
          }
          reach(limit:${limit} period: ${period}){
            date
            value
          }
          fans(limit:${limit} period: ${period}){
            date
            value
          }
          impressionsTotal(limit:${limit} period: ${period}){
            date
            value
          }
          impressionsPaid(limit:${limit} period: ${period}){
            date
            value
          }
          impressionsOrganic(limit:${limit} period: ${period}){
            date
            value
          }
          impressionsViral(limit:${limit} period: ${period}){
            date
            value
          }
          engagementTotal(limit:${limit} period: ${period}){
            date
            value
          }
          engagementPaid(limit:${limit} period: ${period}){
            date
            value
          }
          engagementOrganic(limit:${limit} period: ${period}){
            date
            value
          }
          engagementViral(limit:${limit} period: ${period}){
            date
            value
          }
          investment(limit:${limit} period: ${period}){
            date
            value
          }
          comments(limit:${limit} period: ${period}){
            date
            value
          }
        }
      }
    }
  }

`
}