
export const postdetail =(limit=7)=>{
    return`
    query {
        pulse {
          youtube {
            content {
              postDetail (limit: ${limit}){
                date
                media {
                  kind
                  value
                }
                type
                title
                text
                time
                reach
                engagementRate
                views
                interactions
                shares
                likes
                dislike
                comments
                affinity
              }
            }
          }
        }
      }
      
      `
    }

