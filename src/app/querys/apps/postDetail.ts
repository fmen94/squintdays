import * as moment from 'moment';

export const postDetail =()=>{
   
    
    return`
    query {
      pulse {
        apps {
          general {
            generalInfo {
              id
              app_name
              store
              category
              votes
              rating
              clasification
              installation
              app_img {
                kind
                value
              }
              media_url {
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