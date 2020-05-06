
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { common } from '../../querys/apps/common'
import { general } from '../../querys/apps/general'
import { forkJoin } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppsService {

  constructor(
    private apollo: Apollo,
  ) { }
  getData(limit,period,idapp){
    return forkJoin(
      this.apollo.query({query: gql`${common(limit,period)}`,context:{  headers: {"idapp": `${idapp}`} }}),
      this.apollo.query({query: gql`${general()}`,context:{  headers: {"idapp": `${idapp}`} }})
    )
  }
  transformSuscription(result, page_id,users){
    let user =users.find(e=>{
      return e.kind== page_id
    })
    let general = {

      title: user.name,
      nick: user.value,
      category: user.category,
      general:{
        logo:{
          kind: "",
          value: null
        }
      }
    }
    return [ Object.assign( result[0].data.pulse.apps .general,
      ),general]
  }
}
