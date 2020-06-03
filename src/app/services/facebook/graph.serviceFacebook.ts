import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { common } from '../../querys/Facebook/common';
import { community } from '../../querys/Facebook/community';
import { affinity } from '../../querys/Facebook/affinty';
import { varios } from '../../querys/Facebook/varios';
import { investment } from '../../querys/Facebook/investmet';
import { conversation } from '../../querys/Facebook/conversation';
import { HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { general } from '../../querys/Facebook/general';
import { locationQuery } from '../../querys/Facebook/location';
import { user } from 'src/app/querys/Facebook/users';
import {Http} from '@angular/http'
import { forkJoin } from 'rxjs';
import { postdetail} from '../../querys/Facebook/postdeatail'

@Injectable({
  providedIn: 'root'
})
export class GraphServiceFace {

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
getVariosService(limit,idFace){
  return this.apollo.query({query: gql`${varios(limit)}`,context:{  headers: {"idface": `${idFace}`} }})
}
getPostDetailService(limit,idFace){
  return this.apollo.query({query: gql`${postdetail(limit)}`,context:{  headers: {"idface": `${idFace}`} }})
}
 getData(limit,period,idFace){
  return forkJoin(
    this.apollo.query({query: gql`${common(limit,period)}`,context:{  headers: {"idface": `${idFace}`} }}),
    this.apollo.query({query: gql`${community(limit,period)}`,context:{  headers: {"idface": `${idFace}`} }}),
    this.apollo.query({query: gql`${investment(limit,period)}`,context:{  headers: {"idface": `${idFace}`} }}),
    this.apollo.query({query: gql`${affinity(limit,period)}`,context:{  headers: {"idface": `${idFace}`} }}),
    this.apollo.query({query: gql`${conversation(limit,period)}`,context:{  headers: {"idface": `${idFace}`} }}),
    this.apollo.query({query: gql`${general()}`,context:{  headers: {"idface": `${idFace}`} }})
  )
}
transformSuscription(result){
  return [ Object.assign( result[0].data.pulse.facebook.common,
    result[1].data.pulse.facebook.community,
    result[2].data.pulse.facebook.investmentReturn,
    result[3].data.pulse.facebook.affinity,
    result[4].data.pulse.facebook.conversation
    ),result[5]]
}
 getLocation(period,idFace,location,socialNetwork){
  if(socialNetwork=='FB'){socialNetwork="facebook"}
else if(socialNetwork=='IG'){socialNetwork="instagram"}
   let a = this.apollo.query({query: gql`${locationQuery(period,location,socialNetwork)}`,context:{  headers: {"idface": `${idFace}`} }}).toPromise()
   return Promise.all([a]).then((result: any[])=>{   
    return result[0].data.audit[socialNetwork][location]
   })
 }
 renovateConection(){
  this.apollo.removeClient()
  this.apollo.create({
    cache: new InMemoryCache(),
    link: this.httpLink.create({
      uri: "https://graph.squintboard.com/"
      //uri: "http://localhost:4000/"
    })
  })
}
async getUsers(network){
  let users
  await this.apollo.query({query: gql`${user(network)}`}).toPromise()
  .then(e=>{
    users= e
  })
  return users
}

async getLifetime(idFace){
  let users
  await this.apollo.query({
    query: gql`query{
      audit{
        facebook{
          lifetime{
            name
            start
            end
            value
          }
        }
      }
    }`,
    context:{  headers: {"idface": `${idFace}`} }
  }).toPromise()
  .then(e=>{
    users= e
  })
  return users
}

getTokeRef(code){
  let url = `http://localhost:3000/api/v1/refreshToken?code=${code}`
  return this.http.get(url)
}
  

}
