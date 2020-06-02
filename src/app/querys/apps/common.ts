import * as moment from 'moment';

export const common =(limit=7,period="DL")=>{
    let end =moment().format('MM/DD/YYYY')
    let start = moment().subtract(limit,'days').format("MM/DD/YYYY")

    
    return`
    query{
      pulse{
        apps{
          general{
            installs(limit:${limit} period: ${period}){
              id
              data{
                date
                value
              }
            }
            countryRanking(limit:${limit} period: ${period}){
              id
              data{
                date
                value
              }
            }
            categoryRanking(limit:${limit} period: ${period}){
              id
              data{
                date
                value
              }
            }
            globalRanking(limit:${limit} period: ${period}){
              id
              data{
                date
                value
              }
            }
          }
        }
      }
    }
    `
    }