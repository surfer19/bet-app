import {Component, OnInit, Input} from "@angular/core";
import { VoteItem } from "./vote-item";

@Component({
  selector: "vote-item",
  templateUrl: "vote-item.component.html",
  styleUrls: ["vote-item.component.scss"]
  //providers: [  ]
})

export class VoteItemComponent implements OnInit {
  // item from parent component
  @Input() voteItem: VoteItem;

  ngOnInit() {
    console.log("in child item =", this.voteItem);
  }
  pressLike(): void {
    if (this.voteItem.voted == "no") {
      this.voteItem.points++;
    } else if (this.voteItem.voted == "dislike") {
      console.log("added 2 points");
      this.voteItem.points += 2;
    } else if (this.voteItem.voted == "like") { // user can't 2x press like button
        return;
    } else {
      console.warn("something is wrong in pressLike function");
    }
    this.voteItem.voted = "like";
  }
  pressDislike(): void {
    if (this.voteItem.voted == "no") {
      this.voteItem.points--;
    } else if (this.voteItem.voted == "like") {
      this.voteItem.points -= 2;
    } else if (this.voteItem.voted == "dislike") { // user can't 2x press like disbutton
      return;
    } else {
      console.warn("something is wrong in pressDislike function");
    }
    this.voteItem.voted = "dislike";
  }
}
