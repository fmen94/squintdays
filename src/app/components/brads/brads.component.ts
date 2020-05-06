import { varios } from 'src/app/querys/Youtube/varios';
import { postDetailTrans } from './../../transformations/postDetail';
import { Component, OnInit } from '@angular/core';
import { transGraph } from '../../transformations/comonGraph.transformations';
import * as Chart from 'chart.js'
import { comparator } from '../../transformations/comparatorDays';
import { comparatorActualy } from '../../transformations/comparatorDaysActualy';
import { comparatorProm } from '../../transformations/comparatorDaysProm';
import { GraphServiceFace } from '../../services/facebook/graph.serviceFacebook';
import { GraphserviceInstagramService } from '../../services/instagram/graphservice-instagram.service'
import { GraphserviceYoutubeService } from '../../services/youtube/graphservice-youtube.service'
import { countryGraph } from '../../transformations/countryGraph.transformations';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute} from '@angular/router';
import { SitesService } from '../../services/sites/sites.service'
import { AppsService  } from '../../services/apps/apps.service'
import { GraphServiceNews } from '../../services/news/graph.serviceNews'
@Component({
  selector: 'app-brads',
  templateUrl: './brads.component.html',
  styleUrls: ['./brads.component.css']
})
export class BradsComponent implements OnInit {
//Basic
limit:number = 15
period: string = "DL"
//random = ((parseInt(Math.random()*1000))).toString()
//token= "EAAKoAQhf3dUBAOZAaTIB0RN2ilEdPychkTzCV6cya0tiofQkIKFo6OuR3VB0SEHKhCQBwxF5rGW1UhAj8MbPMIWFFFS6NT5qxwWAo4dRLXRFNlBoEDRwQtZA0PS6FColOVjXoB6NYZCsu0xs8rVJTdpfFUAsugNm34eJZAbp4Q"+this.random+"ZDZD"
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
varios: any;
DataCalc: any=[];
general: any;
post: any;
postDetail: any
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
    private graphYt: GraphserviceYoutubeService, 
    private siteService: SitesService,
    private appsService: AppsService,
    private graphServiceNews: GraphServiceNews
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
  variosController(location){
    if(this.chanel=="FB"){this.getVarios(location)}
    else if(this.chanel=="YT"){this.getVariosYt(location)}
  }
  getVariosYt(location){
    this.postDetail=null
    this.loading= true
    this.clearData(true)
    this.activeButun= location
    this.Data=null
    this.graphYt.getVariosService(this.limit,this.page_id).subscribe((e:any  )=>{
      this.loading= false
      this.varios = e
      
    })
  }
  getVarios(location){
    this.postDetail=null
    this.loading= true
    this.clearData(true)
    this.activeButun= location
    this.Data=null
    this.graphService.getVariosService(this.limit,this.page_id).subscribe((e:any  )=>{
      this.loading= false
      this.varios = e
    })
  }
  postDetailControler(location){
    if(this.chanel=="FB"){this.getPostDetail(location)}
    else if(this.chanel=="YT"){this.getPostDetailYt(location)}
  }
  getPostDetailYt(location){
    this.postDetail=null
    this.loading= true
    this.clearData(true)
    this.activeButun= location
    this.Data=null
    this.graphYt.getPostDetailService(this.limit,this.page_id).subscribe((e:any  )=>{
      this.loading= false
      this.postDetail= postDetailTrans(e.data.pulse.youtube.content.postDetail,this.limit,this.period)
    })
  }
  getPostDetail(location){
    this.postDetail=null
    this.loading= true
    this.clearData(true)
    this.activeButun= location
    this.Data=null
    this.graphService.getPostDetailService(this.limit,this.page_id).subscribe((e:any  )=>{
      this.loading= false
      this.postDetail= postDetailTrans(e.data.pulse.facebook.content.postDetail,this.limit,this.period)
    })
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
  trasnsfomDataNews(){
    this.activeButun= "general"
    this.clearData()
    this.graphServiceNews.getData(this.page_id)
    .subscribe(e=>{
      e=this.graphServiceNews.transformSuscription(e)
      this.loading= false
      this.Data = transGraph(e[0],this.limit,this.period)
      this.days= this.Data.shift() 
      this.post = this.Data.pop()  
      this.general= null
    }).closed
    
  }
  trasnsfomData(){
    this.activeButun= "general"
    this.clearData()
    this.graphService.getData(this.limit,this.period,this.page_id)
    .subscribe((e:any)=>{
      e=this.graphService.transformSuscription(e)
      this.loading= false
      let dat = transGraph(e[0],this.limit,this.period)
      dat=dat.reduce((obj,el)=>{
        if(el[0]=="Sentiment"||el[0]=="EngagementRate"||el[0]=="EngagementPaid"||el[0]=="EngagementOrganic"||el[0]=="EngagementViral"||el[0]=="Comments"||el[0]=="RelevanceScore"||el[0]=="Shares"||el[0]=="PostPerformanceRatio"||el[0]=="ReactionsCount"||el[0]=="VideoViewsEvolution"||el[0]=="Reach"){
          this.DataCalc.push(el)
        }else{
          obj.push(el)
        }
        return obj
      },[])
      this.Data= dat
      this.days= this.Data.shift() 
      this.post = []
      this.general= e[1].data.pulse.facebook
      this.general.category = this.brand? this.brand.category : "PET_SUPPLIES"
      this.getChart()
    }).closed
    
  }
  trasnsfomDataApps(){
    this.activeButun= "general"
    this.clearData()
    this.appsService.getData(this.limit,this.period,this.page_id)
    .subscribe((e:any)=>{
      e=this.appsService.transformSuscription(e, this.page_id,this.users)
      this.loading= false
      this.Data = transGraph(e[0],this.limit,this.period)
      this.days= this.Data.shift() 
      this.post = null 
      this.general= e[1]
      this.getChart()
    }).closed
    
  }
  trasnsfomDataSite(){
    this.activeButun= "general"
    this.clearData()
    this.siteService.getData(this.limit,this.period,this.page_id)
    .subscribe((e:any)=>{
      e=this.siteService.transformSuscription(e)
      this.loading= false
      this.Data = transGraph(e[0],this.limit,this.period)
      this.days= this.Data.shift() 
      this.post = null 
      this.general= e[1].data.pulse.sites
      this.getChart()
    }).closed
    
  }
  trasnsfomDataInsta(){
    this.activeButun= "general"
    this.clearData()
    this.graphInsta.getData(this.limit,this.period,this.brand.value)
    .subscribe(e=>{
      e=this.graphInsta.transformSuscription(e)
     this.loading= false
     this.Data = transGraph(e[0],this.limit,this.period)
     this.days= this.Data.shift() 
     this.post = this.Data.pop()
     this.general= e[1].data.pulse.instagram
     this.general.category = this.brand.category
     this.getChart()
      
    }).closed
  }
  trasnsfomDataYt(){
    this.activeButun= "general"
    this.clearData()
    this.graphYt.getData(this.limit,this.period,this.page_id).then(e=>{
     this.loading= false
     this.Data = transGraph(e[0],this.limit,this.period)
     this.days= this.Data.shift() 
     this.post = []
     this.general= e[1].data.pulse.youtube
     this.general.category = this.brand.category 
     this.getChart()
    })
  }

  getChanel(){
    if(this.chanel=="IG"){this.trasnsfomDataInsta()}
    else if(this.chanel=="FB"){this.trasnsfomData()}
    else if(this.chanel=="YT"){this.trasnsfomDataYt()}
    else if(this.chanel=="ST"){this.trasnsfomDataSite()}
    else if(this.chanel=="AP"){this.trasnsfomDataApps()}
    else if(this.chanel=="NW"){this.trasnsfomDataNews()}
  }
  update(){
    this.brand=this.users.find(e=>e.kind==this.page_id)
    this.graphService.renovateConection()
    this.getChanel()
  }
  clearData(general= false){
    this.loading= true
    this.DataCalc=[]
    this.Data=[]
    this.post=[]
    this.varios= null
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
    this.trasnsfomData()
  }
}
