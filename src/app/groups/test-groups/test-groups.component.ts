import { Component, Injectable } from '@angular/core';
import {TicketGroupsService, ITicketGroupsService} from '../ticket-groups.service';
import { TICKET } from './mock-ticket';
import {EGroupingStrategy, Tip, TicketGroup} from "./helper-interfaces";

@Component({
  selector: 'app-test-groups',
  templateUrl: './test-groups.component.html',
  styleUrls: ['./test-groups.component.scss'],
  providers: [ TicketGroupsService ]
})

@Injectable()
export class TestGroupsComponent {

  private ticket: Tip[];
  private groups: TicketGroup[];

  constructor(private ticketService: TicketGroupsService) {
    // assign mock data
    this.ticket = TICKET;
    // this.groups = ticketService.generateXGroups(this.ticket, 3, EGroupingStrategy.sport);
    this.groups = ticketService.generateGroupsWithSameTotalOdds(this.ticket, 15, EGroupingStrategy.random);
  }
}
