export class VoteItem {
  public title: string;
  public description: string;
  public points: number;
  public voted: EUserVote;
  public status: EVoteItemStatus;
}
export enum EUserVote
{
  noValue = 0,
  like,
  dislike
}
export enum EVoteItemStatus
{
  active = 0,
  accepted,
  refused
}
