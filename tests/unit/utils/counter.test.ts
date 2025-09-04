import { describe, expect, test } from 'vitest';
import { formatCount, incrementCounter } from '../../../src/utils/counter';

describe('incrementCounter', () => {
  test('increments by 1 by default', () => {
    expect(incrementCounter(5)).toBe(6);
  });

  test('respects default max limit of 100', () => {
    expect(incrementCounter(99)).toBe(100);
    expect(incrementCounter(100)).toBe(100);
    expect(incrementCounter(95, 10)).toBe(100);
  });
});

describe('formatCount', () => {
  test('formats singular count', () => {
    expect(formatCount(1)).toBe('1 time');
  });

  test('formats plural counts', () => {
    expect(formatCount(0)).toBe('0 times');
    expect(formatCount(2)).toBe('2 times');
    expect(formatCount(10)).toBe('10 times');
    expect(formatCount(100)).toBe('100 times');
  });
});
