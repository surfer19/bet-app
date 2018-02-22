import { Component, OnInit, Input } from "@angular/core";
import {VoteItem, EUserVote, EVoteItemStatus} from "./vote-item";

@Component({
  selector: "vote-item",
  templateUrl: "vote-item.component.html",
  styleUrls: ["vote-item.component.scss"]
})

export class VoteItemComponent implements OnInit {
  // vote item from parent component
  @Input() voteItem: VoteItem;

  isInactiveLike: boolean;
  isInactiveDislike: boolean;
  isActiveLike: boolean;
  isActiveDislike: boolean;
  isItemStatusEnabled: boolean;
  isItemStatusAccepted: boolean;
  isItemStatusRefused: boolean;

  ngOnInit() {
    // for both states
    if (this.voteItem.status != EVoteItemStatus.active){
      this.isActiveDislike = true;
      this.isActiveLike = true;
    }
    if (this.voteItem.status == EVoteItemStatus.accepted) {
      this.isItemStatusAccepted = true
    } else if (this.voteItem.status == EVoteItemStatus.refused) {
      this.isItemStatusRefused = true;
    }
    this.setClasses(this.voteItem);
  }

  pressLike(): void {
    let status = this.voteItem.status;
    // dont do nothing on user interaction
    if (status != EVoteItemStatus.active)
        return;

    switch (this.voteItem.voted) {
      // not voted
      case EUserVote.noValue:
        this.voteItem.points++;
        break;
      case EUserVote.dislike:
        this.voteItem.points += 2;
        break;
      case EUserVote.like:
        return;
      default:
        console.warn("something is wrong in pressLike()");
    }
    this.voteItem.voted = EUserVote.like;
    this.setClasses(this.voteItem);
  }

  pressDislike(): void {
    let status = this.voteItem.status;
    // dont do nothing on user interaction
    if (status != EVoteItemStatus.active)
        return;
    switch (this.voteItem.voted) {
      case EUserVote.noValue:
        this.voteItem.points--;
        break;
      case EUserVote.like:
        this.voteItem.points -= 2;
        break;
      case EUserVote.dislike:
        return;
      default:
        console.warn("something is wrong in pressDislike()");
    }
    this.voteItem.voted = EUserVote.dislike;
    this.setClasses(this.voteItem);
  }

  setClasses(item :VoteItem): void {
    let voted = item.voted;
    let status = item.status;
    console.log(voted);
    if (status == EVoteItemStatus.active) {
      switch(voted) {
        case EUserVote.dislike:
          this.isActiveDislike = true;
          this.isInactiveLike = true;
          // reset to default other classes
          this.isActiveLike = false;
          this.isInactiveDislike = false;
          break;
        case EUserVote.like:
          this.isActiveLike = true;
          this.isInactiveDislike = true;
          // reset to default other classes
          this.isActiveDislike = false;
          this.isInactiveLike = false;
          break;
        case EUserVote.noValue:
          break;
        default:
          console.log("something wrong in setClasses()");
      }
    }
    if (item.status == EVoteItemStatus.accepted || item.status == EVoteItemStatus.refused){
      this.isItemStatusEnabled = true;
    }
  }
}
