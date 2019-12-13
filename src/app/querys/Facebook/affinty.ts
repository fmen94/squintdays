import * as moment from 'moment';

export const affinity =(limit=7,period="DL")=>{
let end =moment().format('MM/DD/YYYY')
let start = moment().subtract(limit,'days').format("MM/DD/YYYY")

return`
query{
  pulse{
    facebook{
       affinity{
        shares(limit:${limit} period: ${period}){
          date
          value
        }
        stories(limit:${limit} period: ${period}){
          date
          value
        }
        postPerformanceRatio(limit:${limit} period: ${period}){
          date
          value
        }
        reactionsCount(limit:${limit} period: ${period}){
          date
          value
        }
        clicks(limit:${limit} period: ${period}){
          date
          value
        }
        videoViewsEvolution(limit:${limit} period: ${period}){
          date
          value
        } 
      }
    }
  }
}`
}