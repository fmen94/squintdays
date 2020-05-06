
export const general =()=>{

    return`
    query{
        pulse{
          sites{
            title
            nick
            logo{
              kind
              value
            }
          }
        }
      }
    
    `
    }       