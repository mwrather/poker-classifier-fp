import { F } from 'ts-toolbelt';

type Predicate<T> = (x: T) => boolean;

const curry = <Fn extends F.Function>(
  fn: Fn,
  ...args: unknown[]
): F.Curry<Fn> =>
  args.length >= fn.length
    ? fn(...args)
    : (...newArgs: unknown[]) => curry(fn, ...args, ...newArgs);

const compose: F.Compose =
  (...fns: Array<(x: unknown) => unknown>) =>
  (input: unknown) =>
    fns.reduceRight((x, fn) => fn(x), input);

const add = (a: number) => (b: number) => a + b;

// logic
const equals = curry((val: unknown, input: unknown) =>
  Array.isArray(val) && Array.isArray(input)
    ? input.reduce((acc, curr, i) => acc && curr === val[i], true)
    : val === input,
);
const arrayEquals = curry((arr1: unknown[], arr2: unknown[]) =>
  arr2.reduce((acc, curr, i) => acc && curr === arr1[i], true),
);
const and = curry((a: unknown, b: unknown) => a && b);
const both = curry(<T>(test1: Predicate<T>, test2: Predicate<T>, x: T) =>
  and(test1(x), test2(x)),
);
const all = curry(<T>(test: Predicate<T>, xs: T[]) =>
  xs.reduce<boolean>((acc, curr) => acc && test(curr), true),
);
const cond =
  <TInput, TResult>(
    conditions: [Predicate<TInput>, (x: TInput) => TResult][],
  ) =>
  (input: TInput): TResult | void => {
    for (const [pred, result] of conditions) {
      if (pred(input)) return result(input);
    }
  };

//values
const identity = <T>(x: T): T => x;
const always =
  <T>(x: T) =>
  (): T =>
    x;
const T = always(true);
const range = curry((start: number, end: number): number[] =>
  Array.from({ length: end - start }, (_, i) => start + i),
);

// objects
const prop = curry((key, obj) => obj[key]);
const values = <T>(obj: Record<string, T>): T[] => Object.values(obj);

// arrays
const length = (xs: unknown[]) => xs.length;
const head = <T>(xs: T[]): T => xs[0];
const map = curry((fn, xs) => xs.map(fn));
const filter = curry((fn, xs) => xs.filter(fn));
const sort = curry((fn, xs) => xs.sort(fn));
const includes = curry((x, xs) => xs.includes(x));
const countBy = curry((fn, xs) =>
  xs.reduce(
    (acc, curr) => ({
      ...acc,
      [fn(curr)]: (acc[fn(curr)] || 0) + 1,
    }),
    {},
  ),
);

const pluck = compose(map, prop);

// combinators
const converge = (fn, transforms) => (input) =>
  fn(...transforms.map((f) => f(input)));
const S = (f, g) => (x) => f(x)(g(x));

// ==================================================================================

const isFlush = compose(
  converge(all, [compose(equals, head), identity]),
  pluck('suit'),
);

const getSortedRanks = compose(
  sort((a, b) => a - b),
  pluck('rank'),
);
const isStraight = compose(
  S(arrayEquals, compose(converge(range, [identity, add(5)]), head)),
  getSortedRanks,
);
const isRoyal = compose(arrayEquals([1, 10, 11, 12, 13]), getSortedRanks);

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
