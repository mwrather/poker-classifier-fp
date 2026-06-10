# Learn Functional Programming in Javascript

This repository gives code samples illustrating how to refactor a small program using functional principles and the [Ramda](https://ramdajs.com/) JavaScript library.

This program classifies poker hands -- groups of five cards are classified as a royal flush, straight flush, and so on. It is implemented in imperative TypeScript,
and alternatively in:

* `conventional.ts` - using native methods on `Array.prototype`
* `ramda.ts` - using the [RamdaJS](https://ramdajs.com/) library
* `homegrown.ts` - using a homegrown, zero-dependency FP library

## System Requirements

- [`git`](https://git-scm.com/)
- [`NodeJS`](https://nodejs.org/)
- [`npm`](https://npmjs.com/)

## Setup

Clone this repo and install dependencies.

```shell
git clone https://github.com/mwrather/poker-classifier-fp.git
cd poker-classifier-fp
npm i
```

## Working

As you experiment with different implementations, use the tests to check your work:

```shell
npm test        # test the implementation once
```
