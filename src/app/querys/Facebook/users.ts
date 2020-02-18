
export const user =(network)=>{

return`
query {
  audit {
    facebook {
      users(network: "${network}") {
        kind
        name
        value
        category
      }
    }
  }
}


`
}