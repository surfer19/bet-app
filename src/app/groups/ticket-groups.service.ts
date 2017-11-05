import { Injectable } from '@angular/core';
import {Tip, EGroupingStrategy, ITicketGroup, EBetSport, TicketGroup} from "./test-groups/helper-interfaces";
import {isUndefined} from "ngx-bootstrap/bs-moment/utils/type-checks";

export interface ITicketGroupsService {
  generateXGroups(tips: Tip[], x: number, strategy: EGroupingStrategy): TicketGroup[];
  generateGroupsWithSameTotalOdds(tips: Tip[], expectedOdd: number, strategy: EGroupingStrategy): TicketGroup[];
  // internal funcs
  recomputeTotalOddInGroups(ticketGroups: TicketGroup[], x: Number): TicketGroup[];
  idxMinTotalOdd(smallestArr): number;
  idxMinItemInGroup(ticketGroup :TicketGroup) :number;
  regroupBySport(ticketGroups: TicketGroup[], sport: EBetSport): TicketGroup[];
  regroupByConfidence(ticketGroups: TicketGroup[], confidence: number): TicketGroup[];
  regroupByDate(ticketGroups: TicketGroup[], date: Date): TicketGroup[];
  regroupByCompetition(ticketGroups: TicketGroup[], competition: string): TicketGroup[];
  // regroupByRandom(ticketGroups: TicketGroup[]): TicketGroup[];// TODO WHAT IS THIS??
}

@Injectable()
export class TicketGroupsService implements ITicketGroupsService {

  private resultXGroups: TicketGroup[];

  constructor() {}

  generateGroupsWithSameTotalOdds(tips: Tip[], expectedOdd: number, strategy: EGroupingStrategy): TicketGroup[] {
    let finalTicketGroups:TicketGroup[] = [];

    tips.forEach(tip => {
      let was_pushed = false;
      // algorithm
      // is group.totalOdd < expectedOdd? 
      // yes -> push here
      // no go to next group
      for (let group of finalTicketGroups) {
          let newPossibleTotalOdd = group.totalOdd * tip.odd;
          let expectedOddWithVariance = expectedOdd + (expectedOdd*0.20); 
          // push tip to first existing group 
          if (newPossibleTotalOdd < expectedOddWithVariance) {
            // get group idx with lowest totalOdd
            let minIdx = this.idxMinTotalOdd(finalTicketGroups);
            // push tip to group with lowest totalOdd(to the end of array)
            let lastIndexArray = finalTicketGroups[minIdx].tips.length;
            
            finalTicketGroups[minIdx].tips[lastIndexArray] = tip; // tips[lastItem+1] = ...          
            this.recomputeTotalOddInGroups(finalTicketGroups);
            
            // set flag
            was_pushed = true;
            break;
          }  
      }
      // if tip is not right for any group create new group 
      if (!was_pushed) {
        let tips: Tip[] = [];
        // create new group and push there tip
        let ticketGroup = new TicketGroup();
        ticketGroup.tips = tips;
        ticketGroup.tips.push(tip);
        // push group to groups
        finalTicketGroups.push(ticketGroup);
        console.log("pushed tip [new arr] = ", tip);
        this.recomputeTotalOddInGroups(finalTicketGroups);
      }  
    });
    
    let lastGroupOdd = finalTicketGroups[finalTicketGroups.length-1].totalOdd;
    let tempTip: Tip;
    // tip from group with HIGHEST totalOdd
    // how to find from which group we will get tips
    let idxMaxTotalOdd = this.idxMaxTotalOdd(finalTicketGroups); 
    let lastGroupIdx =  finalTicketGroups.length-1;
    let possibleLastGroupOdd: number;
    let moveTip = true;
    /*
     * last group totalOdd must be higher than 70% from expectedOdd 
     */
    // if not split group items to another groups
    /*if (lastGroupOdd < (0.7 * expectedOdd)){
      // if (0) { // just for debug purpose
      // sorted all tips low to high
      finalTicketGroups.forEach(group => {
        group.tips = group.tips.sort((obj1, obj2) => {        
          return obj1.odd - obj2.odd;
        });
      });
      console.log("sorted", finalTicketGroups);
      // get tip with SMALLEST odd
      finalTicketGroups[idxMaxTotalOdd].tips.forEach(tip => {
        // compute possible odd after this iteration, if is bigger than expected odd, stop moving tips
        possibleLastGroupOdd = finalTicketGroups[lastGroupIdx].totalOdd * tip.odd;
        console.log("last", possibleLastGroupOdd);
        // 20% deviation
        if (possibleLastGroupOdd > expectedOdd * 1.20)
          // we dont have to iterate anymore
          moveTip = false;
        else
          moveTip = true;
        
        if (moveTip){
          // store first tip 
          tempTip = tip;
          // remove first tip from original arr
          finalTicketGroups[idxMaxTotalOdd].tips.shift();
          // push tip to last group
          finalTicketGroups[lastGroupIdx].tips.push(tempTip);
          // recompute total odd
          finalTicketGroups = this.recomputeTotalOddInGroups(finalTicketGroups);
          // update var lastGroupOdd
          lastGroupOdd = finalTicketGroups[finalTicketGroups.length-1].totalOdd;
          // get idx of biggest group
          idxMaxTotalOdd = this.idxMaxTotalOdd(finalTicketGroups);
          console.log("new biggst grp", idxMaxTotalOdd);
        }
      });
    }*/
    /*
     * prechadza groupy az dokym neplati ze posledna groupa je > 70% expectedOdd
     * 
     * pokial v groupe po vytiahnuti prvku z nej je totalOdd viac ako 70% vytiahnem prvok 
     */

     /*
     * last group totalOdd must be higher than 70% from expectedOdd 
     */
    let groupsWithoutLast = finalTicketGroups.slice(0, -1);
    console.log("without last= ", groupsWithoutLast);
    
    
     while (lastGroupOdd < expectedOdd*0.7) {
        // iterate over groups except last
        groupsWithoutLast.forEach((group, idx) => {
          // get idx of smallest item in group
          let idxMin =  this.idxMinItemInGroup(groupsWithoutLast[idx]);
          //console.log("smallest in first group", idxMin);

          // get smallest item
          let smallest = group.tips[idxMin];
          
          console.log("smallest = ", smallest);
          // check total odd in original group after possible move ...
          // actual group must be higer than 70% of expected totalOdd
          if (group.totalOdd - smallest.odd > expectedOdd * 0.70) {
            console.log("move");
            // we can move item from actual group to last final group
            
            finalTicketGroups[idx].tips.push(smallest);

            // todo remove them from original array 
            groupsWithoutLast[idx].tips.splice(idxMin ,1)

            lastGroupOdd += smallest.odd;
            this.recomputeTotalOddInGroups(groupsWithoutLast);
          }
        //  else {
        //    return
        //  }
          // push him to last
          
        });
     }
  
  
    console.log("without last", groupsWithoutLast);
    console.log("final final", finalTicketGroups);

    let helperGroups:TicketGroup[] = [];
    //helperGroups = this.regroupBySport(finalTicketGroups, EBetSport.basketball);
    
    return finalTicketGroups;
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
      finalXGroups = this.recomputeTotalOddInGroups(finalXGroups);
      // find group with smallest totalOdd and store index of this group
      let idx = this.idxMinTotalOdd(finalXGroups);
      // push item to this idx
      finalXGroups[idx].tips[finalXGroups[idx].tips.length] = tip;
    }
    // recompute after last iteration
    finalXGroups = this.recomputeTotalOddInGroups(finalXGroups);

    console.log("RESULT = ", finalXGroups);

    return finalXGroups;
  }
  // return idx of minimal value in array from groups
  idxMinTotalOdd(finalXGroups):number{
    let helperArr = [];
    // create array of totalOdds
    for (let ticketGroup of finalXGroups) {
      helperArr.push(ticketGroup.totalOdd);
    }
    // get index with smallest totalOdd
    let indexOfMinValue = helperArr.reduce((iMin, x, i, arr) => x < arr[iMin] ? i : iMin, 0);
    return indexOfMinValue;
  }
  idxMaxTotalOdd(array) {
    let helperArr = [];
    // create array of totalOdds
    for (let ticketGroup of array) {
      helperArr.push(ticketGroup.totalOdd);
    }
    // let tmp = array.map(function(o) {
    //   return o.value;
    // });
    let maxValue = Math.max.apply(Math, helperArr);
    //find the index using the tmp array, need to convert maxValue to a string since value is of type string
    var index = helperArr.indexOf(maxValue);
    
    console.log("max ", index);
    return index;
  }
  idxMinItemInGroup(ticketGroup: TicketGroup): number {
    // []: Tip
    // get idx smallest value odd
    let helperArr = [];
    // create array of totalOdds
    for (let tip of ticketGroup.tips) {
      helperArr.push(tip.odd);
    }
    let minValue = Math.min.apply(Math, helperArr);
    var index = helperArr.indexOf(minValue);
    return index;
  }

  recomputeTotalOddInGroups(ticketGroups: TicketGroup[]): TicketGroup[]{
    for (let i=0; i<ticketGroups.length; i++) {
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
  regroupBySport(ticketGroups: TicketGroup[], sport: EBetSport): TicketGroup[] { 
    let affectPercentage = 0.5; //50%
    let helpSameSportTip = [];
    let numOfSameSport: number;
    let numMoveTips: number;
    // iterate over groups
    ticketGroups.forEach(group => {
      // get tips with input sport
      // iterate over tips
      group.tips.forEach(tip => {
        let obj = {};
        console.log(tip);
        if (tip.sport == sport)
          helpSameSportTip.push(tip);
      });
    });
    numOfSameSport = helpSameSportTip.length;
    console.log("same = ", numOfSameSport);
    numMoveTips = Math.round(numOfSameSport * affectPercentage);
    console.log("numMoveTips = ", numMoveTips);
    console.log("tips with same sport", helpSameSportTip);
    // now we found how many tips we need move
    // todo but we dont know where a from which group :(
    // 1.what to add -> ticket with our sport && ticket must have smallest odd
    // 2.where to add -> where is most times our sport
    // IMPORTANT -> we need to remove moved tips from original groups
    
    // sort tips from lowest to biggest
    helpSameSportTip = helpSameSportTip.sort((obj1, obj2) => {
      return obj1.odd - obj2.odd;
    });
    console.log("sort ", helpSameSportTip);
    // 1. what to add
    // get smallest tip 
    helpSameSportTip.forEach(tip => {
      // find tip in arrays and remove him
      
    });

    let a:TicketGroup[];
    return a;
  }
  regroupByConfidence(ticketGroups: TicketGroup[], confidence: number): TicketGroup[] {
    let a:TicketGroup[];
    return a;
  }
  regroupByDate(ticketGroups: TicketGroup[], date: Date): TicketGroup[] {
    let a:TicketGroup[];
    return a;
  }
  regroupByCompetition(ticketGroups: TicketGroup[], competition: string): TicketGroup[] {
    let a:TicketGroup[];
    return a;
  }
  
  
}
