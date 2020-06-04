
import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { common } from "../../querys/Instagram/common"
import { community } from "../../querys/Instagram/community"
import { investment } from "../../querys/Instagram/investment"
import { affinity } from "../../querys/Instagram/affinity"
import { conversation } from "../../querys/Instagram/conversation"
import { postDetail } from "../../querys/Instagram/postDetail"
import { general } from '../../querys/Instagram/general';
import { Observable,forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GraphserviceInstagramService {

  constructor(
    private apollo: Apollo
  ) { }
//   getData(limit,period,idinsta){
//     let a = this.apollo.query({query: gql`${common(limit,period)}`,context:{  headers: {"idinsta": `${idinsta}`} }}).toPromise()
//     let b = this.apollo.query({query: gql`${community(limit,period)}`,context:{  headers: {"idinsta": `${idinsta}`} }}).toPromise()
//     let c = this.apollo.query({query: gql`${investment(limit,period)}`,context:{  headers: {"idinsta": `${idinsta}`} }}).toPromise()
//     let d = this.apollo.query({query: gql`${affinity(limit,period)}`,context:{  headers: {"idinsta": `${idinsta}`} }}).toPromise()
//     let e = this.apollo.query({query: gql`${conversation(limit,period)}`,context:{  headers: {"idinsta": `${idinsta}`} }}).toPromise()
//     let f = this.apollo.query({query: gql`${content(limit,period)}`,context:{  headers: {"idinsta": `${idinsta}`} }}).toPromise()
//     let g = this.apollo.query({query: gql`${general()}`,context:{  headers: {"idinsta": `${idinsta}`} }}).toPromise()
//   return Promise.all([a,b,c,d,e,f,g]).then((result: any[])=>{
//      return [ Object.assign( result[0].data.pulse.instagram.common,
//         result[1].data.pulse.instagram.community,
//         result[2].data.pulse.instagram.investmentReturn,
//         result[3].data.pulse.instagram.affinity,
//         result[4].data.pulse.instagram.conversation,
//         result[5].data.pulse.instagram.content
//       ),result[6],result[5]]
//    })
//  }
 getData(limit,period,idinsta){
  return forkJoin(
    this.apollo.query({query: gql`${common(limit,period)}`,context:{  headers: {"idinsta": `${idinsta}`} }}),
    this.apollo.query({query: gql`${community(limit,period)}`,context:{  headers: {"idinsta": `${idinsta}`} }}),
    this.apollo.query({query: gql`${investment(limit,period)}`,context:{  headers: {"idinsta": `${idinsta}`} }}),
    this.apollo.query({query: gql`${affinity(limit,period)}`,context:{  headers: {"idinsta": `${idinsta}`} }}),
    this.apollo.query({query: gql`${conversation(limit,period)}`,context:{  headers: {"idinsta": `${idinsta}`} }}),
    this.apollo.query({query: gql`${general()}`,context:{  headers: {"idinsta": `${idinsta}`} }}),
  )
}
transformSuscription(result){
  return [ Object.assign( result[0].data.pulse.instagram.common,
    result[1].data.pulse.instagram.community,
    result[2].data.pulse.instagram.investmentReturn,
    result[3].data.pulse.instagram.affinity,
    result[4].data.pulse.instagram.conversation,
  ),result[5]]
}
getPost(limit,idinsta){
  return this.apollo.query({query: gql`${postDetail(limit)}`,context:{  headers: {"idinsta": `${idinsta}`} }})
}
}
