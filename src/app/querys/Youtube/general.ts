
export const general =()=>{

return`
query {
  pulse {
    youtube {
      title
      nick
      general {
        logo {
          kind
          value
        }
      }
    }
  }
}

`
}