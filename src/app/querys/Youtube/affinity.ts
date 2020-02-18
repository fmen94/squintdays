import * as moment from 'moment';

export const affinity =(limit=7,period="DL")=>{

return`
query{
  pulse{
    youtube{
      affinity{
        likes(limit:${limit} period: ${period}){
          date
          value
        }
        deslikes(limit:${limit} period: ${period}){
          date
          value
        }
        shares(limit:${limit} period: ${period}){
          date
          value
        }
        viewsMembers(limit:${limit} period: ${period}){
          date
          value
        }
      }
    }
  }
}
`
}