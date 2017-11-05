import { VoteItem, EUserVote, EVoteItemStatus } from "../vote-item/vote-item";

export const VOTES: VoteItem[] = [
  {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
                 "Donec eget aliquam dui, quis suscipit ipsum. Fusce ultricies " +
                 "nec nulla et egestas. Duis vitae erat hendrerit, vestibulum turpis " +
                 "in, congue metus. Vivamus cursus erat ut nibh vulputate laoreet sit " +
                 "amet sit amet dolor. Vivamus maximus turpis ac lorem sollicitudin, sed " +
                 "imperdiet lorem tempor.",
    points: 100,
    voted: EUserVote.noValue,
    status: EVoteItemStatus.active
  },
  {
    title: "Lorem ipsum dolor sit amet, consectetur.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget aliquam dui, quis suscipit ipsum. Fusce ultricies nec nulla et egestas. ",
    points: 42,
    voted: EUserVote.like,
    status: EVoteItemStatus.active
  },
  {
    title: "Lorem ipsum dolor sit amet, consectetur.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget aliquam dui, quis suscipit ipsum. Fusce ultricies nec nulla et egestas. ",
    points: -10,
    voted: EUserVote.dislike,
    status: EVoteItemStatus.active
  },
  {
    title: "Lorem ipsum dolor sit amet, consectetur.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget aliquam dui, quis suscipit ipsum. Fusce ultricies nec nulla et egestas. ",
    points: 80,
    voted: EUserVote.dislike,
    status: EVoteItemStatus.accepted
  },
  {
    title: "Lorem ipsum dolor sit amet, consectetur.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget aliquam dui, quis suscipit ipsum. Fusce ultricies nec nulla et egestas. ",
    points: -15,
    voted: EUserVote.dislike,
    status: EVoteItemStatus.refused
  }
];

