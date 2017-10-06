import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StatsArticlesComponent } from "./stats/stats-articles/stats-articles.component";
import { VoteListComponent } from "./vote/vote-list/vote-list.component";
import { VoteItemComponent } from "./vote/vote-item/vote-item.component";
import { TestGroupsComponent } from './groups/test-groups/test-groups.component';

const appRoutes: Routes = [
  {
    path: 'stats-articles',
    component: StatsArticlesComponent
  },
  {
    path: 'votes',
    component: VoteListComponent
  },
  {
    path: 'groups',
    component: TestGroupsComponent
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
    StatsArticlesComponent,
    VoteListComponent,
    VoteItemComponent,
    TestGroupsComponent
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
export class AppModule {}
