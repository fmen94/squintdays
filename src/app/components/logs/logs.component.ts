import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ConectionService } from '../../services/logs/conection.service'
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  constructor(
    public conect: ConectionService
  ) { }
  start= moment().format("YYYY-MM-DD") //DD/MM/YYYY HH:MM  A
  end = moment().add(1,"days").format("YYYY-MM-DD")
  page = 1
  search= null
  component=0
  type = "info' , 'error"
   logs:[any]= null 
   respLogs: any
   changePage(e){
    this.page= (this.page==1 && e==-1)||(this.page==this.logs[this.logs.length-1].page&& e==1)? this.page:
     this.page=this.page+e
   }
  getLogs(){
    this.logs= null
     this.conect.getLogs(this.start,this.end,this.type,this.search).then(e=>{
     this.logs=e
     this.logs.map((el,index)=>{
       el.shipment_id=="FB Extractor"? el.component= "FB Extractor":
       el.component="ETL"
       el.page= Math.ceil((index+1)/15)
     })
     this.respLogs= this.logs
     this.getComponet()
   })
  }
  getComponet(){
    
    this.logs=this.respLogs.reduce((obj,e)=>{
      if(this.component==0){
        obj.push(e)
      }else
      if(this.component==1 && e.shipment_id!="FB Extractor"){
        obj.push(e)
      }else
      if(this.component==2 && e.shipment_id=="FB Extractor"){
        obj.push(e)
      }
      return obj
    },[])
  }
  ngOnInit(): void {
    this.getLogs()
  }

}
