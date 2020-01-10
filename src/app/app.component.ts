import { Component } from '@angular/core';
import { transGraph } from './transformations/comonGraph.transformations';
import * as Chart from 'chart.js'
import { comparator } from './transformations/comparatorDays';
import { comparatorActualy } from './transformations/comparatorDaysActualy';
import { comparatorProm } from './transformations/comparatorDaysProm';
import { GraphServiceFace } from './services/facebook/graph.serviceFacebook';
import { GraphserviceInstagramService } from './services/instagram/graphservice-instagram.service'
import { countryGraph } from './transformations/countryGraph.transformations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  //Basic
  limit:number = 15
  period: string = "DL"
  brand: number = 0
  ids= [
    {idFace:"534334316747920",idinsta:"hillspetmx"},
    {idFace:"264954487761424",idinsta:"teamknowlogy_dev"},
    {idFace:"147705395260558",idinsta:"bancoazteca"}]
  chanel:string ="F"
  //Data
  days: any;
  Data: any;
  general: any;
  post: any;
  //Teble
  objectKeys = Object.keys;
  
  //Bench
  benchData: number ;
  benchDataActyaly: number ;
  benchDataProm: number ;

  //validations
  isCommon =true
  activeButun='general'
  //chart
  canvas: any;
  ctx: any;
  charDate: any[];
  charData: any[]; 
  charTitle: any[];
  myChart:any

  constructor(
    private graphService: GraphServiceFace,
    private graphInsta: GraphserviceInstagramService
  ){}
  isPost(e){
    if(!e){return false}
    if(typeof e=="object"){
      return true
    }
    else return false
  }

   getChart(i=4) {
     this.myChart? this.myChart.destroy() : this.myChart
     this.benchDataActyaly=comparatorActualy(this.Data[i],this.days)
    this.benchData=comparator(this.Data[i],this.days)
    this.benchDataProm = comparatorProm(this.Data[i],this.days)
    let days = [...this.days]
    days.shift()
    const data = [...this.Data[i]]
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    this.myChart = new Chart(this.ctx,  {
      type: 'line',
      data: {
				labels: days,
				datasets: [{
					label: data.shift(),
					backgroundColor:'rgba(191, 63, 63, 1)',
					borderColor: 'rgba(191, 63, 63 , 1)',
					data: data,
					fill: false,
				}]
			},
      options: {
        responsive: false,
        display:true
      }
    });
  }
  
 getLocaton(location){
   this.activeButun= location
   this.Data=[]
    this.graphService.getLocation(this.period,this.ids[this.brand].idFace,location,this.chanel).then(e=>{
      if(e.length==0){return}
    this.Data = countryGraph(e,this.limit,this.period);
    this.days= this.Data.shift() 
    this.isCommon=false
    this.getChart()
    })
  }
  trasnsfomData(){
    this.activeButun= "general"
    this.Data=[]
    this.graphService.getData(this.limit,this.period,this.ids[this.brand].idFace).then(e=>{
      this.Data = transGraph(e[0],this.limit,this.period)
     this.days= this.Data.shift() 
     this.post = this.Data.pop()  
     this.general= e[1].data.pulse.facebook
     this.getChart()
    })
    
  }
  trasnsfomDataInsta(){
    this.activeButun= "general"
    this.Data=[]
    this.graphInsta.getData(this.limit,this.period,this.ids[this.brand].idinsta).then(e=>{
      this.Data = transGraph(e[0],this.limit,this.period)
     this.days= this.Data.shift() 
     this.post = this.Data.pop()
     this.general= e[1].data.pulse.instagram
     
     this.getChart()
    
    })
    
  }
  getChanel(){
    if(this.chanel=="I"){this.trasnsfomDataInsta()}
    else if(this.chanel=="F"){this.trasnsfomData()}
  }
  update(){
   this.graphService.renovateConection()
   this.getChanel()
  }
  ngOnInit(){
    this.trasnsfomData()
  }
}
