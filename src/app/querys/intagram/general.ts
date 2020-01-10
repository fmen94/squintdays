
export const general =()=>{

return`
query {
  pulse {
    instagram {
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