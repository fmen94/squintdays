import * as moment from 'moment'

export const varios =(limit=7)=>{
    let end =moment().format('MM/DD/YYYY')
let start = moment().subtract(limit,'days').format("MM/DD/YYYY")

    return`
    query{
      pulse{
        youtube{
          affinity{
            postType(dateStartEnd:{ start:"${start}", end: "${end}"}){
              name
              value
            }
          }
        }
      }
    }

      `
    }