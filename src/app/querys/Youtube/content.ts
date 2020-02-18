
export const content =(limit=7,period="DL")=>{

return`
query {
  pulse {
    youtube {
      content {
        post (limit: 50 performances: M ){
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