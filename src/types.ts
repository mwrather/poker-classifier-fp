export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
export type Suit = 'clubs' | 'diamonds' | 'hearts' | 'spades';

type Card = { rank: Rank; suit: Suit };

export type Hand = [Card, Card, Card, Card, Card];
