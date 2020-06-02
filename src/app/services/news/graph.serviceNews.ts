import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

import { content } from '../../querys/news/content';
import { HttpLink } from "apollo-angular-link-http";
import { keywords } from "../../querys/news/keywords";

import {Http} from '@angular/http'
import { forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GraphServiceNews {

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private http: Http
  ) { }

//  getData(limit,period,idFace){
//     let a = this.apollo.query({query: gql`${common(limit,period)}`,context:{  headers: {"idface": `${idFace}`} }}).toPromise()
//    let b = this.apollo.query({query: gql`${community(limit,period)}`,context:{  headers: {"idface": `${idFace}`} }}).toPromise()
//    let c = this.apollo.query({query: gql`${investment(limit,period)}`,context:{  headers: {"idface": `${idFace}`} }}).toPromise()
//    let d = this.apollo.query({query: gql`${affinity(limit,period)}`,context:{  headers: {"idface": `${idFace}`} }}).toPromise()
//    let e = this.apollo.query({query: gql`${conversation(limit,period)}`,context:{  headers: {"idface": `${idFace}`} }}).toPromise()
//    let f = this.apollo.query({query: gql`${content(limit,period)}`,context:{  headers: {"idface": `${idFace}`} }}).toPromise()
//    let g= this.apollo.query({query: gql`${general()}`,context:{  headers: {"idface": `${idFace}`} }}).toPromise()
//   return Promise.all([a,b,c,d,e,f,g]).then((result: any[])=>{
//      return [ Object.assign( result[0].data.pulse.facebook.common,
//       result[1].data.pulse.facebook.community,
//       result[2].data.pulse.facebook.investmentReturn,
//       result[3].data.pulse.facebook.affinity,
//       result[4].data.pulse.facebook.conversation,
//       result[5].data.pulse.facebook.content
//       ),result[6],result[5]]
//    })
//  }
 getData(idnews){
  return forkJoin(
    this.apollo.query({query: gql`${content()}`,context:{  headers: {"idnews": `${idnews}`} }}),
    this.apollo.query({query: gql`${keywords()}`,context:{  headers: {"idnews": `${idnews}`} }})
  )
}
transformSuscription(result){
  let res = []
   res.push(result[1].data.audit.news.keywords)
   res.push(result[0].data.pulse.news.post.map(e=>{
      e.media=e.note_image
      e.text=e.post_text
      e.title=e.note_title
      e.type= e.note_section
      return e
    })
  )
  return res
}

}
