import {Routes} from '@angular/router'


import { AppComponent } from './app.component';
import { BradsComponent } from './components/brads/brads.component'
import { LogsComponent } from './components/logs/logs.component'

export const routes: Routes = [
    { path: 'home',  component: AppComponent },
    { path: 'brands',  component: BradsComponent },
    { path: 'logs',  component: LogsComponent }
]