import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnvironmentComponent } from './environment/environment.component';
import { GeneralComponent } from './general/general.component';
import { ToxComponent } from './tox/tox.component';
import { ValueComponent } from './value/value.component';

const routes: Routes = [
  { path: 'value/:submissionNumber', component: ValueComponent },
  { path: 'tox/:submissionNumber', component: ToxComponent },
  { path: 'general/:submissionNumber', component: GeneralComponent },
  { path: 'environment/:submissionNumber', component: EnvironmentComponent },
  { path: '', component: DashboardComponent },
  { path: ':activeCode', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
