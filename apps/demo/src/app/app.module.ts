import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { HighlightDirective } from './highlight.directive';
import { UnlessDirective } from './unless.directive';
import { ValueComponent } from './value/value.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { ToxComponent } from './tox/tox.component';
import { GeneralComponent } from './general/general.component';
import { EnvironmentComponent } from './environment/environment.component';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HighlightDirective,
    UnlessDirective,
    ValueComponent,
    DashboardComponent,
    ToxComponent,
    GeneralComponent,
    EnvironmentComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule], // add this line, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
