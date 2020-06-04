
export const postDetail =(limit)=>{

    return`
    query{
        pulse{
          instagram{
            content{
              postDetail(limit: ${limit}){
                text
                date
                media{
                  kind
                  value
                }
                interactions
                comment
                like
                impressions
                reach
                engagementRate
                affinity
                saves
                views
              }
            }
          }
        }
      }
    
    
    `
    }
