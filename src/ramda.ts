import {
  add,
  always,
  ap,
  ascend,
  both,
  compose,
  cond,
  converge,
  countBy,
  equals,
  filter,
  head,
  identity,
  includes,
  length,
  pluck,
  prop,
  range,
  sort,
  T,
  uniq,
  values,
} from 'ramda';

import type { Hand, Suit, Rank } from './types.ts';

const isFlush = compose<Hand, Suit[], Suit[], number, boolean>(equals(1), length, uniq, pluck<'suit'>('suit'));

const getSortedRanks = compose<Hand, Rank[], Rank[]>(sort(ascend(Number)), pluck('rank'));
const isStraight = compose<Hand, Rank[], boolean>(
  ap(equals, compose<Rank[], [Rank[], Rank[]]>(converge(range, [identity, add(5)]), head)),
  getSortedRanks,
);
const isRoyal = compose<Hand, Rank[], boolean>(equals([1, 10, 11, 12, 13] as Rank[]), getSortedRanks);

const getRankIndexValues = compose<Hand>(values, countBy(prop('rank')));

const isFourOfAKind = compose<Hand>(includes(4), getRankIndexValues);
const isThreeOfAKind = compose<Hand>(includes(3), getRankIndexValues);
const isFullHouse = compose<Hand>(both(includes(3), includes(2)), getRankIndexValues);

const getPairs = compose<Hand>(length, filter(equals(2)), getRankIndexValues);
const isTwoPair = compose<Hand>(equals(2), getPairs);
const isPair = compose<Hand>(equals(1), getPairs);

export default cond<Hand>([
  [both(isRoyal, isFlush), always('royalFlush')],
  [both(isStraight, isFlush), always('straightFlush')],
  [isFlush, always('flush')],
  [isFourOfAKind, always('fourOfAKind')],
  [isFullHouse, always('fullHouse')],
  [isStraight, always('straight')],
  [isThreeOfAKind, always('threeOfAKind')],
  [isTwoPair, always('twoPair')],
  [isPair, always('pair')],
  [T, always('none')],
]);
