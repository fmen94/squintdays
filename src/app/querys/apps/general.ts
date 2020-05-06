
export const general =()=>{

    return`
    query{
      pulse{
        apps{
          general{
            generalInfo{
              app_name
              app_img{
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