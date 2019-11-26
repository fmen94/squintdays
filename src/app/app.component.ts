import { Component, OnInit, ViewChild } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { common } from './querys/common';
import { transGraph } from './transformations/comonGraph.transformations';
import { community } from './querys/community';
import { investment } from './querys/investmet';
import { affinity } from './querys/affinty';
import { conversation } from './querys/conversation';
import * as Chart from 'chart.js'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  limit:number = 7
  period: string = "DL"
  idFace:string = "534334316747920"
  days: any;
  commons: any[];
  community: any[];
  Data: any[]
  investment: any[]
  objectKeys = Object.keys;
  affinity: any[];
  conversation: any[];

  //chart
  canvas: any;
  ctx: any;
  charDate: any[];
  charData: any[]; 
  charTitle: any[];
  constructor(
    private apollo: Apollo
  ){}

   getChart(i) {
    let days = [...this.days]
    days.shift()
    const data = [...this.Data[i]]
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx,  {
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

  trasnsfomData(){
    this.Data =transGraph(Object.assign(this.commons,this.community,this.investment,this.affinity, this.conversation),this.limit)
    this.days= this.Data[0]
    this.Data.shift() 
    this.getChart(4)
  }
  update(){
    this.getData()
  }
  async getData(){
    await this.apollo.query({query: gql`${common(this.limit,this.period)}`,context:{  headers: {"idface": `${this.idFace}`} }})
    .subscribe( res  => {
      let result:any = res
       this.commons = result.data.pulse.facebook.common
       this.trasnsfomData()
    });
    await this.apollo.query({query: gql`${community(this.limit,this.period)}`,context:{  headers: {"idface": `${this.idFace}`} }})
    .subscribe( res  => {
      let result: any = res
      this.community = result.data.pulse.facebook.community
    });
    await this.apollo.query({query: gql`${investment(this.limit,this.period)}`,context:{  headers: {"idface": `${this.idFace}`} }})
    .subscribe( res  => {
      let result: any = res
      this.investment = result.data.pulse.facebook.investmentReturn
    });
    await this.apollo.query({query: gql`${affinity(this.limit,this.period)}`,context:{  headers: {"idface": `${this.idFace}`} }})
    .subscribe( res  => {
      let result: any = res
      this.affinity = result.data.pulse.facebook.affinity
      
    });
    await this.apollo.query({query: gql`${conversation(this.limit,this.period)}`,context:{  headers: {"idface": `${this.idFace}`} }})
    .subscribe( res  => {
      let result: any = res
      this.conversation = result.data.pulse.facebook.conversation
    });
  }
  ngOnInit(){
    this.getData()
  }
}
