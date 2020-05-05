const isFlush = (cards) =>
  Object.values(
    cards
      .map(({ suit }) => suit)
      .reduce((acc, curr) => ({ ...acc, [curr]: (acc[curr] || 0) + 1 }), {})
  )[0] === 5;

const getRank = ({ rank }) => rank;

const getSortedRanks = (cards) => cards.map(getRank).sort((a, b) => a - b);

const isStraight = (cards) =>
  getSortedRanks(cards).reduce(
    (acc, curr, ix, arr) => acc && (ix === 0 || curr === arr[ix - 1] + 1),
    true
  );

const isRoyal = (cards) =>
  getSortedRanks(cards).reduce(
    (acc, curr, ix) => acc && curr === [1, 10, 11, 12, 13][ix],
    true
  );

const getRankIndexValues = (cards) =>
  Object.values(
    cards
      .map(getRank)
      .reduce((acc, curr) => ({ ...acc, [curr]: (acc[curr] || 0) + 1 }), {})
  );

const isFourOfAKind = (cards) => getRankIndexValues(cards).includes(4);
const isThreeOfAKind = (cards) => getRankIndexValues(cards).includes(3);
const isFullHouse = (cards) =>
  getRankIndexValues(cards).includes(3) &&
  getRankIndexValues(cards).includes(2);

const getPairs = (cards) =>
  getRankIndexValues(cards).filter((n) => n === 2).length;

const isTwoPair = (cards) => getPairs(cards) === 2;
const isPair = (cards) => getPairs(cards) === 1;

export default function classifyHand(cards) {
  if (isRoyal(cards) && isFlush(cards)) return 'royalFlush';
  if (isStraight(cards) && isFlush(cards)) return 'straightFlush';
  if (isFourOfAKind(cards)) return 'fourOfAKind';
  if (isFullHouse(cards)) return 'fullHouse';
  if (isFlush(cards)) return 'flush';
  if (isStraight(cards)) return 'straight';
  if (isThreeOfAKind(cards)) return 'threeOfAKind';
  if (isTwoPair(cards)) return 'twoPair';
  if (isPair(cards)) return 'pair';
  return 'none';
}
