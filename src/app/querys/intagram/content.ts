
export const content =(limit=7,period="DL")=>{

return`
query {
  pulse {
    instagram {
      content {
        post (limit: 50){
          date
          text
          media {
            kind
            value
          }
        }
      }
    }
  }
}


`
}