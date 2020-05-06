import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
@Injectable({
  providedIn: 'root'
})
export class ConectionService {

  constructor(
    private http: Http
  ) { }

  getLogs(start,end,type,search){
  //let url = `http://localhost:3000/api/logs?start=${start}&end=${end}&type=${type}&search=${search}`
  let url = `http://3.84.177.185:3000/api/logs?start=${start}&end=${end}&type=${type}&search=${search}`
  return fetch(url).then(e=>e.json())
}
}
