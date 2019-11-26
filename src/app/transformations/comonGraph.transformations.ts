import * as moment from 'moment';


export const transGraph = (data,limit=7,period="DL") => {

    let result: any = []
    let days: any[] = ["Contador"]
    let end = moment()
    let start = moment().subtract(limit-1, 'days')
    while (start <= end) {
        days.push(end.format("MM/DD/YYYY"))
        end = end.subtract(1, 'days')
    }
    result[0]= days
    for (const key in data) {
        if (key != "__typename") {
            for (let i = 0; i < days.length; i++) {
                if(i==0){result.push([key.charAt(0).toUpperCase() + key.slice(1)])}
                else{
                let index = data[key].find(e=> moment(e.date).add(1, 'days').format("MM/DD/YYYY")== days[i])
                result[result.length-1].push(index? index.value : "X")     
                }
            }
        }   
    }
    return result
}