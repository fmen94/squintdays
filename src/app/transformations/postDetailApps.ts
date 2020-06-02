import * as moment from 'moment';


export const postDetailTransAp = (data) => {
    return data.reduce((obj,e)=>{
       obj.push({
        media: e.app_img,
        title: e.app_name,
        store: e.store,
        type: e.category,
        votes: e.votes,
        rating: e.rating,
        clasification: e.clasification,
        installation: e.installation,
        source: e.media_url.value,
       })
        return obj
    },[])
}