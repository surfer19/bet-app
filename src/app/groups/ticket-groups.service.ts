import { Injectable } from '@angular/core';
import {Tip, EGroupingStrategy, ITicketGroup, EBetSport, TicketGroup} from "./test-groups/helper-interfaces";
import {isUndefined} from "ngx-bootstrap/bs-moment/utils/type-checks";

export interface ITicketGroupsService {
  generateXGroups(tips: Tip[], x: number, strategy: EGroupingStrategy): TicketGroup[];
  generateGroupsWithSameTotalOdds(tips: Tip[], totalOdds: number, strategy: EGroupingStrategy): TicketGroup[];
  recomputeTotalOdd(ticketGroups: TicketGroup[], x: Number): TicketGroup[];
  idxMinTotalOdd(smallestArr);
}

@Injectable()
export class TicketGroupsService implements ITicketGroupsService {

  private resultXGroups: TicketGroup[];

  constructor() {}

  generateGroupsWithSameTotalOdds(tips: Tip[], totalOdds: number, strategy: EGroupingStrategy): TicketGroup[] {
    return;
  }

  generateXGroups(tips: Tip[], x: number, strategy: EGroupingStrategy): TicketGroup[] {
    // sort tips from biggest to lowest
    let reversedTips: Tip[] = tips.sort((obj1, obj2) => {
      // Ascending: first less than the previous
      return obj2.odd - obj1.odd;
    });

    let helperGroup: TicketGroup = new TicketGroup();
    let helperTicket: Tip[] = [];

    for (let item of reversedTips) {
      helperTicket.push(item);
      helperGroup.tips = helperTicket.slice();
    }

    let finalXGroups: TicketGroup[] = [];
    let helperXTips: Tip[] = [];

    // initialize X groups
    for (let i = 0; i < x; i++) {
      let newGroup = new TicketGroup();
      newGroup.totalOdd = i;
      newGroup.tips = helperXTips;
      // push to array of TicketGroup[]
      finalXGroups[i] = newGroup;
      finalXGroups[i].tips = newGroup.tips.splice(0);
      finalXGroups[i].totalOdd = newGroup.totalOdd;
    }
    for (let tip of helperGroup.tips) {
      // recompute all groups again
      finalXGroups = this.recomputeTotalOdd(finalXGroups, x);
      // find group with smallest totalOdd and store index of this group
      let idx = this.idxMinTotalOdd(finalXGroups);
      // push item to this idx
      finalXGroups[idx].tips[finalXGroups[idx].tips.length] = tip;
    }
    // recompute after last iteration
    finalXGroups = this.recomputeTotalOdd(finalXGroups, x);

    console.log("RESULT = ", finalXGroups);

    return finalXGroups;
  }
  idxMinTotalOdd(finalXGroups){
    let helperArr = [];
    // create array of totalOdds
    for (let ticketGroup of finalXGroups) {
      helperArr.push(ticketGroup.totalOdd);
    }
    // get index with smallest totalOdd
    let indexOfMinValue = helperArr.reduce((iMin, x, i, arr) => x < arr[iMin] ? i : iMin, 0);
    return indexOfMinValue;
  }
  recomputeTotalOdd(ticketGroups: TicketGroup[], x: Number): TicketGroup[]{
    for (let i=0; i<x; i++) {
      // internal counter
      let total = 1;
      for (let item of ticketGroups[i].tips) {
        if (!isUndefined(item.odd)) {
          total *= item.odd;
        }
        else { console.log("undefined"); }
      }
      ticketGroups[i].totalOdd = total;
    }
    return ticketGroups;
  }
}


