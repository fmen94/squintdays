import * as moment from 'moment';

export const investment =(limit=7,period="DL")=>{

return`
query{
  pulse{
    youtube{
      investmentReturn{
        ctr(limit:${limit} period: ${period}) {
          date
          value
        }
        cardClicks (limit:${limit} period: ${period}){
          date
          value
        }
        cardImpressions (limit:${limit} period: ${period}){
          date
          value
        }
      }
    }
  }
}
`
}