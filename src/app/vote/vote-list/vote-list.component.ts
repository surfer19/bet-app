import { Component, OnInit } from "@angular/core";
import { VoteListService } from "./vote-list.service";
import { VoteItem } from "../vote-item/vote-item";
import { Router } from "@angular/router";

@Component({
  selector: "vote-list",
  templateUrl: "vote-list.component.html",
  styleUrls: ["vote-list.component.scss"],
  providers: [ VoteListService ]
})

export class VoteListComponent implements OnInit {
  private voteList: VoteItem[];
  constructor(private voteListService: VoteListService, private router: Router) {}

  ngOnInit() {
    this.getVoteItems();
  }
  getVoteItems() {
    // get all mock votes to our array
    this.voteListService.getVotes().then((votes) => {
      this.voteList = votes;
      // console.log("votelist = ", this.voteList);
    });
  }
}
