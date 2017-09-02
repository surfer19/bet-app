import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StatsArticlesComponent } from "./stats/stats-articles/stats-articles.component";

const appRoutes: Routes = [
  {
    path: 'stats-articles',
    component: StatsArticlesComponent,
  },
  { path: '',
    redirectTo: 'stats-articles',
    pathMatch: 'full'
  },
  //{ path: '**', component: StatsArticlesComponent} // page not found
];
@NgModule({
  declarations: [
    AppComponent,
    StatsArticlesComponent
  ],
  imports: [
    BrowserModule,//
    RouterModule.forRoot(
      appRoutes
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
