import { Injectable } from '@angular/core';
import { ARTICLES } from './mock-stats-articles';
import { StatsArticle } from './stats-article';

@Injectable()
export class StatsArticlesService {
  getArticles(): Promise<StatsArticle[]> {
    return Promise.resolve(ARTICLES);
  }
}
