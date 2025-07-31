// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { CommuneListComponent } from './components/commune-list/commune-list';
import { CommunePopulationComponent } from './components/commune-population/commune-population';
import { ChartPopulationComponent } from './components/charts-population/charts-population';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'communes/provinces', component: CommuneListComponent },
  { path: 'communes/population', component: CommunePopulationComponent },
  { path: 'charts/population', component: ChartPopulationComponent },
  { path: '**', redirectTo: '' },
];
