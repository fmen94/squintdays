import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
//router
import {routes} from './routes'
import { RouterModule } from "@angular/router";
//componets
import { AppComponent } from './app.component';
import { BradsComponent } from './components/brads/brads.component'
import { LogsComponent } from './components/logs/logs.component'

import {HttpModule} from '@angular/http'
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { FormsModule } from '@angular/forms';
import { setContext } from 'apollo-link-context';
import { MomentModule } from 'ngx-moment';

const authLink = setContext((_, { headers }) => {
  const idface = localStorage.getItem('idface');
  return {
    headers: {
      ...headers,
      //idface: idface ? idface : "",
    }
  }
});
@NgModule({
  declarations: [
    AppComponent,
    BradsComponent,
    LogsComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    MomentModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      return {
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink.create({
          uri: "https://graph.squintboard.com/"
          //uri: "http://localhost:4000/"
        }))
      }
    },
    deps: [HttpLink]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
