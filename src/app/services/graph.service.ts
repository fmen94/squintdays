import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { common } from '../querys/Facebook/common';
import { community } from '../querys/Facebook/community';
import { affinity } from '../querys/Facebook/affinty';
import { content } from '../querys/Facebook/content';
import { investment } from '../querys/Facebook/investmet';
import { conversation } from '../querys/Facebook/conversation';
import { HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { general } from '../querys/Facebook/general';
import { locationQuery } from '../querys/Facebook/location';



@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink
  ) { }

 getData(limit,period,idFace){
    let a = this.apollo.query({query: gql`${common(limit,period)}`,context:{  headers: {"idface": `${idFace}`} }}).toPromise()
   let b = this.apollo.query({query: gql`${community(limit,period)}`,context:{  headers: {"idface": `${idFace}`} }}).toPromise()
   let c = this.apollo.query({query: gql`${investment(limit,period)}`,context:{  headers: {"idface": `${idFace}`} }}).toPromise()
   let d = this.apollo.query({query: gql`${affinity(limit,period)}`,context:{  headers: {"idface": `${idFace}`} }}).toPromise()
   let e = this.apollo.query({query: gql`${conversation(limit,period)}`,context:{  headers: {"idface": `${idFace}`} }}).toPromise()
   let f = this.apollo.query({query: gql`${content(limit,period)}`,context:{  headers: {"idface": `${idFace}`} }}).toPromise()
   let g= this.apollo.query({query: gql`${general()}`,context:{  headers: {"idface": `${idFace}`} }}).toPromise()
  return Promise.all([a,b,c,d,e,f,g]).then((result: any[])=>{
     return [ Object.assign( result[0].data.pulse.facebook.common,
      result[1].data.pulse.facebook.community,
      result[2].data.pulse.facebook.investmentReturn,
      result[3].data.pulse.facebook.affinity,
      result[4].data.pulse.facebook.conversation,
      result[5].data.pulse.facebook.content
      ),result[6],result[5]]
   })
 }
 getLocation(period,idFace,location){
   let a = this.apollo.query({query: gql`${locationQuery(period,location)}`,context:{  headers: {"idface": `${idFace}`} }}).toPromise()
   return Promise.all([a]).then((result: any[])=>{
    return result[0].data.audit.facebook[location]
   })
 }
 renovateConection(){
  this.apollo.removeClient()
  this.apollo.create({
    cache: new InMemoryCache(),
    link: this.httpLink.create({
      uri: "https://graph.squintboard.com/"
    })
  })
}




}
