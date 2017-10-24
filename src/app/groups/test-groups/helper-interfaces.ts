
export class Tip {
  matchDate: Date;
  matchCompetitionName: string;
  sport: EBetSport;
  confidence: number;
  odd: number; // kurz
}

export class TicketGroup implements ITicketGroup{
  tips: Tip[];
  totalOdd: number;
}

export interface ITicketGroup {
  tips: Tip[];
  totalOdd: number;
}

export enum EBetSport {
  football,
  hockey,
  basketball,
  handball,
  volleyball
}

export enum EGroupingStrategy {
  random,
  date,// je datum a čas zápasu.
  competition,
  sport,
  confidence
}

