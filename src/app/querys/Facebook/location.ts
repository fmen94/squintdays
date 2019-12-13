
export const locationQuery =(period="DL",location="country" )=>{

return`
query{
  audit{
    facebook{
      ${location}(period:${period}){
        name
        date
        value
      }
    }
  }
}
`
}