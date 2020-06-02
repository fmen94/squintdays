
import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { common } from "../../querys/Youtube/common"
import { community } from "../../querys/Youtube/community"
import { investment } from "../../querys/Youtube/investment"
import { affinity } from "../../querys/Youtube/affinity"
import { content } from "../../querys/Youtube/content"
import { general } from '../../querys/Youtube/general';
import { postdetail } from 'src/app/querys/Youtube/postDetail';
import { varios } from 'src/app/querys/Youtube/varios';

@Injectable({
  providedIn: 'root'
})
export class GraphserviceYoutubeService {

  constructor(
    private apollo: Apollo
  ) { }
  getData(limit,period,idyt){
    let a = this.apollo.query({query: gql`${common(limit,period)}`,context:{  headers: {"idyt": `${idyt}`} }}).toPromise()
    let b = this.apollo.query({query: gql`${community(limit,period)}`,context:{  headers: {"idyt": `${idyt}`} }}).toPromise()
    let c = this.apollo.query({query: gql`${investment(limit,period)}`,context:{  headers: {"idyt": `${idyt}`} }}).toPromise()
    let d = this.apollo.query({query: gql`${affinity(limit,period)}`,context:{  headers: {"idyt": `${idyt}`} }}).toPromise()
    let f = this.apollo.query({query: gql`${content(limit,period)}`,context:{  headers: {"idyt": `${idyt}`} }}).toPromise()
    let g = this.apollo.query({query: gql`${general()}`,context:{  headers: {"idyt": `${idyt}`} }}).toPromise()
  return Promise.all([a,b,c,d,f,g]).then((result: any[])=>{
     return [ Object.assign( result[0].data.pulse.youtube.common,
        result[1].data.pulse.youtube.community,
        result[2].data.pulse.youtube.investmentReturn,
        result[3].data.pulse.youtube.affinity
      ),result[5]]
   })
 }
 getPostDetailService(limit,idyt){
  return this.apollo.query({query: gql`${postdetail(limit)}`,context:{  headers: {"idyt": `${idyt}`} }})
}
getVariosService(limit,idyt){
  return this.apollo.query({query: gql`${varios(limit)}`,context:{  headers: {"idyt": `${idyt}`} }})
}
}
