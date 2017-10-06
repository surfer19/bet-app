import { TestBed, inject } from '@angular/core/testing';

import { TicketGroupsService } from './ticket-groups.service';

describe('TicketGroupsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketGroupsService]
    });
  });

  it('should be created', inject([TicketGroupsService], (service: TicketGroupsService) => {
    expect(service).toBeTruthy();
  }));
});
