import { StatsArticle } from "./stats-article";
import * as moment from 'moment';

let dates = [];
let i=1;
while (i<7) {
  dates.push(moment('2017-01-0'+ i + ' 13:00:00').format("D MMM YY H:mm"));
  i++;
}
export const ARTICLES: StatsArticle[] = [
  {
    date: dates[0],
    title: "Kája přežila klinickou smrt. Někdy má v domečku na krku moc hraček, řekl kouč Plíškové",
    url: "www.sport.cz",
    source: "sport.cz"
  },
  {
    date: dates[1],
    title: "Bumble v Freddie: Andrew 'Elvis' Flintoff trips after winning sing-off",
    url: "www.skysports.com",
    source: "skysports.com"
  },
  {
    date: dates[2],
    title: "Němečtí fotbalisté odmítli přijít poděkovat fanouškům, dopálily je pokřiky během utkání",
    url: "www.sport.cz",
    source: "sport.cz"
  },
  {
    date: dates[3],
    title: "Italian GP Qualifying: Lewis Hamilton sets new F1 pole record",
    url: "www.skysports.com",
    source: "skysports.com"
  },
  {
    date: dates[4],
    title: "Naša „osemnástka” prehrala vo Švédsku aj s Rumunmi",
    url: "www.sport.aktuality.sk",
    source: "sport.sk"
  }
];
