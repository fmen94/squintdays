import * as moment from 'moment';
import { datesForPeriod } from './datesForPeriod';


export const transGraph = (data, limit = 7, period = "DL") => {

    let result: any = []
    let days = datesForPeriod(period, limit)
    result[0] = days



    for (const key in data) {
        if (key != "__typename") {
            for (let i = 0; i < days.length; i++) {
                if (i == 0) { result.push([key.charAt(0).toUpperCase() + key.slice(1)]) }
                else {
                    let index = data[key].find(e => moment(e.date.substr(0,10)).format("MM/DD/YYYY") == days[i])
                    result[result.length - 1].push(value(index))
                }
            }
        }
    }
    return result
}



function value(index) {
    if (index == undefined) { return null }
    if (index.value != undefined) { return index.value }
    else if (index.media != undefined && index.media.value) {
        index.media.value.length<15? index.url=`https://www.youtube.com/embed/${index.media.value}`:null  
        return index }
    else if (index.good != undefined) { return (index.good + index.bad + index.neutral) }
}