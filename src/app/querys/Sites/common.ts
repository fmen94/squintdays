import * as moment from 'moment';

export const common =(limit=7,period="DL")=>{
    let end =moment().format('MM/DD/YYYY')
    let start = moment().subtract(limit,'days').format("MM/DD/YYYY")

    
    return`
    query {
        pulse {
          sites {
            general {
              views(limit:${limit} period: ${period}) {
                date
                value
              }
              uniqueViews(limit:${limit} period: ${period}) {
                date
                value
              }
              bonusRate(limit:${limit} period: ${period}) {
                date
                value
              }
              convertionRate(limit:${limit} period: ${period}) {
                date
                value
              }
              globalRanking(limit:${limit} period: ${period}) {
                date
                value
              }
              countryRanking(limit:${limit} period: ${period}) {
                date
                value
              }
              categoryRanking(limit:${limit} period: ${period}) {
                date
                value
              }
              inversions(limit:${limit} period: ${period}) {
                date
                value
              }
              clicks (limit:${limit} period: ${period}){
                date
                value
              }
              conversions(limit:${limit} period: ${period}) {
                date
                value
              }
              impresions (limit:${limit} period: ${period}){
                date
                value
              }
            }
          }
        }
      }      
    
    `
    }