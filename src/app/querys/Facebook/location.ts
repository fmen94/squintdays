
export const locationQuery =(period="DL",location="country",socialNetwork= "F" )=>{

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