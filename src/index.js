import {
  add,
  always,
  ap,
  ascend,
  both,
  compose,
  concat,
  cond,
  converge,
  countBy,
  equals,
  filter,
  head,
  identity,
  includes,
  length,
  path,
  pluck,
  prop,
  range,
  sort,
  T,
  values,
  all,
} from 'ramda';

const isFlush = compose(
  converge(all, [compose(equals, head), identity]),
  pluck('suit')
);

const getSortedRanks = compose(sort(ascend(identity)), pluck('rank'));
const isStraight = compose(
  ap(equals, compose(converge(range, [identity, add(5)]), head)),
  getSortedRanks
);
const isRoyal = compose(equals([1, 10, 11, 12, 13]), getSortedRanks);

const getRankIndexValues = compose(values, countBy(prop('rank')));

const isFourOfAKind = compose(includes(4), getRankIndexValues);
const isThreeOfAKind = compose(includes(3), getRankIndexValues);
const isFullHouse = compose(both(includes(3), includes(2)), getRankIndexValues);

const getPairs = compose(length, filter(equals(2)), getRankIndexValues);
const isTwoPair = compose(equals(2), getPairs);
const isPair = compose(equals(1), getPairs);

export default cond([
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
