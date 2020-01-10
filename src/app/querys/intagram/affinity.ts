import * as moment from 'moment';

export const affinity =(limit=7,period="DL")=>{

return`
query{
  pulse{
    instagram{
      affinity{
        onlineFollowers(limit:${limit} period: ${period}){
          date
          value
        }
        stories(limit:${limit} period: ${period}){
          date
          value
        }
        postPerformanceRatio(limit:${limit} period: ${period}){
          date
          value
        }
        engagementImageVideo(limit:${limit} period: ${period}){
          date
          value
        }
        impressionsImageVideo(limit:${limit} period: ${period}){
          date
          value
        }
        reachImageVideo(limit:${limit} period: ${period}){
          date
          value
        }
        savesImageVideo(limit:${limit} period: ${period}){
          date
          value
        }
        engagementAlbumes(limit:${limit} period: ${period}){
          date
          value
        }
        impressionsAlbumes(limit:${limit} period: ${period}){
          date
          value
        }
        reachAlbumes(limit:${limit} period: ${period}){
          date
          value
        }
        savesAlbumes(limit:${limit} period: ${period}){
          date
          value
        }
        repliceStories(limit:${limit} period: ${period}){
          date
          value
        }
        impressionsStories(limit:${limit} period: ${period}){
          date
          value
        }
        reachStories(limit:${limit} period: ${period}){
          date
          value
        }
        exitsStories(limit:${limit} period: ${period}){
          date
          value
        }
      }
    }
  }
}
`
}