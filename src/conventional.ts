import type { Card, Hand } from './types';

const isFlush = (cards: Hand) =>
  cards.reduce((acc, curr) => acc && curr.suit === cards[0].suit, true);

const getRanks = (cards: Hand) =>
  cards.map(({ rank }) => rank).sort((a, b) => a - b);

const isStraight = (cards: Hand) =>
  getRanks(cards).reduce(
    (acc, curr, i, ranks) => acc && (i === 0 || curr === ranks[i - 1] + 1),
    true,
  );

const isRoyal = (cards: Hand) =>
  getRanks(cards).reduce(
    (acc, curr, i) => acc && curr === [1, 10, 11, 12, 13][i],
    true,
  );

const getGroups = (cards: Hand) =>
  Object.values(
    cards.reduce<Partial<Record<Card['rank'], number>>>(
      (acc, curr) => ({
        ...acc,
        [curr.rank]: (acc[curr.rank] || 0) + 1,
      }),
      {},
    ),
  ).sort((a, b) => b - a);

const isFourOfAKind = (cards: Hand) => getGroups(cards)[0] === 4;
const isFullHouse = (cards: Hand) =>
  getGroups(cards)[0] === 3 && getGroups(cards)[1] === 2;
const isThreeOfAKind = (cards: Hand) =>
  getGroups(cards)[0] === 3 && getGroups(cards)[1] === 1;
const isTwoPair = (cards: Hand) =>
  getGroups(cards)[0] === 2 && getGroups(cards)[1] === 2;
const isOnePair = (cards: Hand) =>
  getGroups(cards)[0] === 2 && getGroups(cards)[1] === 1;

export default function classifyHand(cards: Hand) {
  if (isFlush(cards) && isRoyal(cards)) return 'royalFlush';
  if (isFlush(cards) && isStraight(cards)) return 'straightFlush';
  if (isFourOfAKind(cards)) return 'fourOfAKind';
  if (isFullHouse(cards)) return 'fullHouse';
  if (isFlush(cards)) return 'flush';
  if (isStraight(cards)) return 'straight';
  if (isThreeOfAKind(cards)) return 'threeOfAKind';
  if (isTwoPair(cards)) return 'twoPair';
  if (isOnePair(cards)) return 'pair';

  return 'none';
}
