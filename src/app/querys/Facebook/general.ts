
export const general =()=>{

return`
query {
  pulse {
    facebook {
      title
      nick
      general {
        logo {
          kind
          value
        }
        cover{
          kind
          value
        }
      }
    }
  }
}

`
}