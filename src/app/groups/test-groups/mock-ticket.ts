 // import { Tip, EBetSport } from "./helper-interfaces";
 export class Tip {
   matchDate: Date;
   matchCompetitionName: string;
   sport: EBetSport;
   confidence: number;
   odd: number; // kurz
 }

 export enum EBetSport {
   football,
   hockey,
   basketball,
   handball,
   volleyball
 }

export const TICKET: Tip[] = [
  /*
   * FOOTBALL
   */
  {
    matchDate: new Date(2017,1,10),
    matchCompetitionName: "Arsenal - Brighton",
    sport: EBetSport.football,
    confidence: 1,
    odd: 1.26
  },
  {
    matchDate: new Date(2017,1,10),
    matchCompetitionName: "Plzeň - Bohemians 1905",
    sport: EBetSport.football,
    confidence: 1,
    odd: 1.40
  },
  {
    matchDate: new Date(2017,3,10),
    matchCompetitionName: "Hertha - Bayern",
    sport: EBetSport.football,
    confidence: 1,
    odd: 4.6
  },
  /*
   * HOCKEY
   */
  {
    matchDate: new Date(2017,1,10),
    matchCompetitionName: "Winnipeg - Toronto",
    sport: EBetSport.hockey,
    confidence: 1,
    odd: 2.40
  },
  {
    matchDate: new Date(2017,8,10),
    matchCompetitionName: "Pittsburgh - St.Louis",
    sport: EBetSport.hockey,
    confidence: 1,
    odd: 1.92
  },
  /*
   * BASKETBALL
   */
  {
    matchDate: new Date(2017,8,10),
    matchCompetitionName: "SBŠ Ostrava - Nymburk",
    sport: EBetSport.basketball,
    confidence: 1,
    odd: 2.5
  },
  {
    matchDate: new Date(2017,5,10),
    matchCompetitionName: "Chance U19 - USK Praha",
    sport: EBetSport.basketball,
    confidence: 1,
    odd: 1.2
  },
  {
    matchDate: new Date(2017,6,10),
    matchCompetitionName: "Trutnov - Technic Brno",
    sport: EBetSport.basketball,
    confidence: 1,
    odd: 1.37
  },
  {
    matchDate: new Date(2017,3,10),
    matchCompetitionName: "Naestved - Svendborg ",
    sport: EBetSport.basketball,
    confidence: 1,
    odd: 50
  },
  {
    matchDate: new Date(2017,3,10),
    matchCompetitionName: "Helsinki Seagulls - Vilpas Vikings",
    sport: EBetSport.basketball,
    confidence: 1,
    odd: 1.74
  },
  {
    matchDate: new Date(2017,8,10),
    matchCompetitionName: "Gravelines - Monaco",
    sport: EBetSport.basketball,
    confidence: 1,
    odd: 2.40
  },
  /*
   * VOLLEYBALL
   */
  {
    matchDate: new Date(2017,3,10),
    matchCompetitionName: "Azerbajdžan - Turecko",
    sport: EBetSport.volleyball,
    confidence: 1,
    odd: 1.40
  },
];

