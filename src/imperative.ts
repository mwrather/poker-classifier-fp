import type { Card, Hand } from './types.ts';

/**
 * Classify a hand of cards.
 */
export default function classifyHand(cards: Hand) {
  let isFlush = true;
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].suit !== cards[0].suit) {
      isFlush = false;
      continue;
    }
  }

  const ranks = [];
  for (let i = 0; i < cards.length; i++) {
    ranks.push(cards[i].rank);
  }
  ranks.sort((a, b) => a - b);

  let isRoyal = true;
  const royalRanks = [1, 10, 11, 12, 13];
  for (let i = 0; i < cards.length; i++) {
    if (ranks[i] !== royalRanks[i]) {
      isRoyal = false;
      continue;
    }
  }

  let isStraight = true;
  for (let i = 1; i < cards.length; i++) {
    if (ranks[i] !== ranks[i - 1] + 1) {
      isStraight = false;
      continue;
    }
  }

  const rankMap: Partial<Record<Card['rank'], number>> = {};
  for (let i = 0; i < cards.length; i++) {
    rankMap[cards[i].rank] = (rankMap[cards[i].rank] || 0) + 1;
  }
  const groups = Object.values(rankMap);
  groups.sort((a, b) => b - a);

  const isFourOfAKind = groups[0] === 4;
  const isFullHouse = groups[0] === 3 && groups[1] === 2;
  const isThreeOfAKind = groups[0] === 3 && groups[1] === 1;
  const isTwoPair = groups[0] === 2 && groups[1] === 2;
  const isOnePair = groups[0] === 2 && groups[1] === 1;

  if (isFlush && isRoyal) return 'royalFlush';
  if (isFlush && isStraight) return 'straightFlush';
  if (isFourOfAKind) return 'fourOfAKind';
  if (isFullHouse) return 'fullHouse';
  if (isFlush) return 'flush';
  if (isStraight) return 'straight';
  if (isThreeOfAKind) return 'threeOfAKind';
  if (isTwoPair) return 'twoPair';
  if (isOnePair) return 'pair';

  return 'none';
}
