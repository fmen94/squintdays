import { Injectable } from '@angular/core';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { common } from '../querys/common';
const client = new ApolloClient({
  uri: 'https://graph.squintboard.com/'
});
@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor() { }

  async getFacebook(id) {
    let response 
  await  client.query({
      query: gql`${common}`,
    })
     
return response.data
  }
}
