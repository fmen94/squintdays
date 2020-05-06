
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { common } from '../../querys/Sites/common'
import { general } from '../../querys/Sites/general'
import { forkJoin } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SitesService {

  constructor(
    private apollo: Apollo,
  ) { }
  getData(limit,period,idsite){
    return forkJoin(
      this.apollo.query({query: gql`${common(limit,period)}`,context:{  headers: {"idsite": `${idsite}`} }}),
      this.apollo.query({query: gql`${general()}`,context:{  headers: {"idsite": `${idsite}`} }})
    )
  }
  transformSuscription(result){
    let general = result[1]
    general.data.pulse.sites.general={logo:result[1].data.pulse.sites.logo}
    
    return [ Object.assign( result[0].data.pulse.sites.general,
      ),general]
  }
}
