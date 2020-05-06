
export const postdetail =(limit=7)=>{
return`
query{
    pulse{
      facebook{
        content{
          postDetail(limit: ${limit}){
            text
            date
            media{
              kind
              value
            }
            reach
            engagementRate
            engagedUsers
            like
            love
            wow
            haha
            sorry
            anger
            impressions
            engagement
            views
            interactions
            shares
            reactions
            clicks
            comment
            affinity
            type
          }
        }
      }
    }
  }
  `
}