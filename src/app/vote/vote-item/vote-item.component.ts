import { Component, OnInit, Input } from "@angular/core";
import { VoteItem } from "./vote-item";

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

  ngOnInit() {
    this.setClasses(this.voteItem.voted);
  }

  pressLike(): void {
    switch (this.voteItem.voted) {
      case "no":
        this.voteItem.points++;
        break;
      case "dislike":
        this.voteItem.points += 2;
        break;
      case "like":
        return;
      default:
        console.warn("something is wrong in pressLike()");
    }
    this.voteItem.voted = "like";
    this.setClasses(this.voteItem.voted);
  }

  pressDislike(): void {
    switch (this.voteItem.voted) {
      case "no":
        this.voteItem.points--;
        break;
      case "like":
        this.voteItem.points -= 2;
        break;
      case "dislike":
        return;
      default:
        console.warn("something is wrong in pressDislike()");
    }
    this.voteItem.voted = "dislike";
    this.setClasses(this.voteItem.voted);
  }

  setClasses(voted): void {
    switch(voted) {
      case "dislike":
        this.isActiveDislike = true;
        this.isInactiveLike = true;
        // reset to default other classes
        this.isActiveLike = false;
        this.isInactiveDislike = false;
        break;
      case "like":
        this.isActiveLike = true;
        this.isInactiveDislike = true;
        // reset to default other classes
        this.isActiveDislike = false;
        this.isInactiveLike = false;
        break;
      case "no":
        break;
      default:
        console.log("something wrong in setClasses()");
    }
  }
}
