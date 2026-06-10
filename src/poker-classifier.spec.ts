import { describe, expect, test } from 'vitest';

import imperative from './imperative.ts';
import conventional from './conventional.ts';
import homegrown from './homegrown.ts';
import ramda from './ramda.ts';

const implementations = [
  { name: 'imperative', impl: imperative },
  { name: 'conventional', impl: conventional },
  { name: 'homegrown', impl: homegrown },
  { name: 'ramda', impl: ramda },
];

describe.each(implementations)(
  '$name implementation',
  ({ name, impl: classifyHand }) => {
    test(`${name} recognizes a royal flush`, () => {
      const result = classifyHand([
        { rank: 10, suit: 'diamonds' },
        { rank: 13, suit: 'diamonds' },
        { rank: 1, suit: 'diamonds' },
        { rank: 12, suit: 'diamonds' },
        { rank: 11, suit: 'diamonds' },
      ]);
      expect(result).toBe('royalFlush');
    });

    test(`${name} recognizes a straight flush`, () => {
      const result = classifyHand([
        { rank: 2, suit: 'clubs' },
        { rank: 6, suit: 'clubs' },
        { rank: 3, suit: 'clubs' },
        { rank: 5, suit: 'clubs' },
        { rank: 4, suit: 'clubs' },
      ]);
      expect(result).toBe('straightFlush');
    });

    test(`${name} recognizes four of a kind`, () => {
      const result = classifyHand([
        { rank: 9, suit: 'clubs' },
        { rank: 9, suit: 'diamonds' },
        { rank: 9, suit: 'spades' },
        { rank: 7, suit: 'hearts' },
        { rank: 9, suit: 'hearts' },
      ]);
      expect(result).toBe('fourOfAKind');
    });

    test(`${name} recognizes a full house`, () => {
      const result = classifyHand([
        { rank: 12, suit: 'clubs' },
        { rank: 12, suit: 'diamonds' },
        { rank: 12, suit: 'spades' },
        { rank: 2, suit: 'hearts' },
        { rank: 2, suit: 'clubs' },
      ]);
      expect(result).toBe('fullHouse');
    });

    test(`${name} recognizes a flush`, () => {
      const result = classifyHand([
        { rank: 1, suit: 'clubs' },
        { rank: 3, suit: 'clubs' },
        { rank: 5, suit: 'clubs' },
        { rank: 7, suit: 'clubs' },
        { rank: 9, suit: 'clubs' },
      ]);
      expect(result).toBe('flush');
    });

    test(`${name} recognizes a straight`, () => {
      const result = classifyHand([
        { rank: 4, suit: 'clubs' },
        { rank: 6, suit: 'hearts' },
        { rank: 7, suit: 'clubs' },
        { rank: 5, suit: 'diamonds' },
        { rank: 8, suit: 'clubs' },
      ]);
      expect(result).toBe('straight');
    });

    test(`${name} recognizes three of a kind`, () => {
      const result = classifyHand([
        { rank: 4, suit: 'clubs' },
        { rank: 4, suit: 'diamonds' },
        { rank: 4, suit: 'spades' },
        { rank: 11, suit: 'hearts' },
        { rank: 2, suit: 'clubs' },
      ]);
      expect(result).toBe('threeOfAKind');
    });

    test(`${name} recognizes two pair`, () => {
      const result = classifyHand([
        { rank: 11, suit: 'clubs' },
        { rank: 9, suit: 'diamonds' },
        { rank: 5, suit: 'spades' },
        { rank: 11, suit: 'hearts' },
        { rank: 9, suit: 'clubs' },
      ]);
      expect(result).toBe('twoPair');
    });

    test(`${name} recgnizes one pair`, () => {
      const result = classifyHand([
        { rank: 1, suit: 'clubs' },
        { rank: 3, suit: 'diamonds' },
        { rank: 9, suit: 'spades' },
        { rank: 7, suit: 'hearts' },
        { rank: 9, suit: 'clubs' },
      ]);
      expect(result).toBe('pair');
    });

    test(`${name} returns none otherwise`, () => {
      const result = classifyHand([
        { rank: 1, suit: 'clubs' },
        { rank: 3, suit: 'diamonds' },
        { rank: 5, suit: 'spades' },
        { rank: 7, suit: 'hearts' },
        { rank: 9, suit: 'clubs' },
      ]);
      expect(result).toBe('none');
    });
  },
);
