import * as moment from 'moment';

export const common =(limit=7,period="DL")=>{
let end =moment().format('MM/DD/YYYY')
let start = moment().subtract(limit,'days').format("MM/DD/YYYY")

return`
query{
  pulse{
    instagram{
      common{
        sentiment(dateStartEnd:{start: "${start}", end:"${end}"}){
          date
          good
          bad
          neutral
        }
        views(limit:${limit} period: ${period}){
          date
          value
        }
        reach(limit:${limit} period: ${period}){
          date
          value
        }
        impresions(limit:${limit} period: ${period}){
          date
          value
        }
        interactions(limit:${limit} period: ${period}){
          date
          value
        }
        followers(limit:${limit} period: ${period}){
          date
          value
        }
        engagementRate(limit:${limit} period: ${period}){
          date
          value
        }
        interactionsPaid(limit:${limit} period: ${period}){
          date
          value
        }
        interactionsOrganic(limit:${limit} period: ${period}){
          date
          value
        }
      }
    }
  }
}

`
}