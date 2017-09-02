import { Component, OnInit, Input } from "@angular/core";
import { Router } from '@angular/router';
import { StatsArticle } from './stats-article';
import { StatsArticlesService } from './stats-articles.service'
//import { ROUTER_PROVIDERS } from "@angular/router/src/router_module";

@Component({
  selector: "sm-stats-articles",
  templateUrl: "./stats-articles.component.html",
  styleUrls: ["./stats-articles.component.scss"],
  providers: [ StatsArticlesService ]
})
export class StatsArticlesComponent implements OnInit {

  @Input()
  public teamId: string;

  articles: StatsArticle[];
  category: string;

  constructor(private statsArticlesService: StatsArticlesService, private router: Router) { }

  ngOnInit() {
    this.category = "The best news around the world.";
    this.getArticles();
  }

  getArticles(): void {
    this.statsArticlesService.getArticles().then(articles => this.articles = articles);
  }
  // TODO
  redirect(pagename: string) {
    this.router.navigate(['#']); //+pagename
  }
}
