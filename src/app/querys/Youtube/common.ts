import * as moment from 'moment';

export const common =(limit=7,period="DL")=>{
let end =moment().format('MM/DD/YYYY')
let start = moment().subtract(limit,'days').format("MM/DD/YYYY")

return`
query{
  pulse{
    youtube{
      common{
        sentiment(dateStartEnd:{start: "${start}", end:"${end}"}){
          date
          good
          bad
          neutral
        }
        subscribers(limit:${limit} period: ${period}) {
          date
          value
        }
        newSubscribers(limit:${limit} period: ${period}) {
          date
          value
        }
        views(limit:${limit} period: ${period}) {
          date
          value
        }
        investment (limit:${limit} period: ${period}){
          date
          value
        }
        comments(limit:${limit} period: ${period}) {
          date
          value
        }
        engagement (limit:${limit} period: ${period}){
          date
          value
        }
        whatched(limit:${limit} period: ${period}) {
          date
          value
        }
      }
    }
  }
}

`
}