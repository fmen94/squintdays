
export const locationQuery =(period="DL",location="country",socialNetwork= "FB" )=>{

return`
query{
  audit{
    ${socialNetwork}{
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