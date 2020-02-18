import { Component } from '@angular/core';
import { transGraph } from './transformations/comonGraph.transformations';
import * as Chart from 'chart.js'
import { comparator } from './transformations/comparatorDays';
import { comparatorActualy } from './transformations/comparatorDaysActualy';
import { comparatorProm } from './transformations/comparatorDaysProm';
import { GraphServiceFace } from './services/facebook/graph.serviceFacebook';
import { GraphserviceInstagramService } from './services/instagram/graphservice-instagram.service'
import { GraphserviceYoutubeService } from './services/youtube/graphservice-youtube.service'
import { countryGraph } from './transformations/countryGraph.transformations';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  //Basic
  limit:number = 15
  period: string = "DL"
  brand: {"kind": "534334316747920","name": "Hill’s Pet Nutrition","value": "HillsPetMX", "category": "PET_SUPPLIES"}
  page_id: string= "534334316747920"
  ids= [
    {idFace:"534334316747920",idinsta:"hillspetmx",idyt:""},
    {idFace:"264954487761424",idinsta:"teamknowlogy_dev",idyt:"UCXJSUq7G5iluJTfZQqvR-QA"},
    {idFace:"147705395260558",idinsta:"bancoazteca",idyt:""}]
  chanel:string ="FB"
  users=[]
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
  loading= false
  //chart
  canvas: any;
  ctx: any;
  charDate: any[];
  charData: any[]; 
  charTitle: any[];
  myChart:any


  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private graphService: GraphServiceFace,
    private graphInsta: GraphserviceInstagramService,
    private graphYt: GraphserviceYoutubeService
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
   this.clearData(true)
    this.graphService.getLocation(this.period,this.page_id,location,this.chanel).then(e=>{
      this.loading= false
      if(e.length==0){return}
    this.Data = countryGraph(e,this.limit,this.period);
    this.days= this.Data.shift() 
    this.isCommon=false
    this.getChart()
    })
  }
  trasnsfomData(){
    this.activeButun= "general"
    this.clearData()
    this.graphService.getData(this.limit,this.period,this.page_id).then(e=>{
     this.loading= false
     this.Data = transGraph(e[0],this.limit,this.period)
     this.days= this.Data.shift() 
     this.post = this.Data.pop()  
     this.general= e[1].data.pulse.facebook
     this.general.category = this.brand? this.brand.category : "PET_SUPPLIES"
     this.getChart()
    })
    
  }
  trasnsfomDataInsta(){
    this.activeButun= "general"
    this.clearData()
    this.graphInsta.getData(this.limit,this.period,this.brand.value).then(e=>{
     this.loading= false
     this.Data = transGraph(e[0],this.limit,this.period)
     this.days= this.Data.shift() 
     this.post = this.Data.pop()
     this.general= e[1].data.pulse.instagram
     this.general.category = this.brand.category
     this.getChart()
    })
  }
  trasnsfomDataYt(){
    this.activeButun= "general"
    this.clearData()
    this.graphYt.getData(this.limit,this.period,this.page_id).then(e=>{
     this.loading= false
     this.Data = transGraph(e[0],this.limit,this.period)
     this.days= this.Data.shift() 
     this.post = this.Data.pop()
     this.general= e[1].data.pulse.youtube
     this.general.category = this.brand.category 
     this.getChart()
    })
  }

  getChanel(){
    if(this.chanel=="IG"){this.trasnsfomDataInsta()}
    else if(this.chanel=="FB"){this.trasnsfomData()}
    else if(this.chanel=="YT"){this.trasnsfomDataYt()}
  }
  update(){
    this.brand=this.users.find(e=>e.kind==this.page_id)
    this.graphService.renovateConection()
    this.getChanel()
  }
  clearData(general= false){
    this.loading= true
    this.Data=[]
    this.post=[]
    this.myChart? this.myChart.destroy() : this.myChart
    this.benchDataActyaly=null
    this.benchData=null
    this.benchDataProm = null
    !general? this.general= null : null
  }
  async getUsers(first=false){
    await this.graphService.getUsers(this.chanel).then(e=>{
      this.users =e.data.audit.facebook.users
      !first? this.page_id = null :null
    })
  }
  getDefault(index,elem){
    if(   this.Data[index][0]==elem){return elem}
     else if((this.Data[index][0]=='Comments'||this.Data[index][0]=='Investment')&&elem == null){ return "0"}
    else if(
      this.Data[index][0]!='Post' &&
    elem == null){
      return 'SD'
    }
    return elem != null ? elem :   "Null"
  }
  getFrime(e){
    return this.sanitizer.bypassSecurityTrustResourceUrl(e.url);
  }
  ngOnInit(){
    this.getUsers(true)
    this.route.queryParams.subscribe( params => {
      if(params.code){
        this.graphService.getTokeRef(params.code).subscribe(e=>{
          console.log(e);
          
        })
      }
    })
    this.trasnsfomData()
  }
}
