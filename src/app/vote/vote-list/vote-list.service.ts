import { Injectable } from '@angular/core';
import { VOTES } from './mock-votes';
import { VoteItem } from '../vote-item/vote-item';

@Injectable()
export class VoteListService {
  getVotes(): Promise<VoteItem[]> {
    return Promise.resolve(VOTES);
  }
}
