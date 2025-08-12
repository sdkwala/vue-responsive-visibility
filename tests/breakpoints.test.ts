import { describe, it, expect } from 'vitest';
import { getMediaQuery, defaultBreakpoints } from '../src/utils/breakpoints';

describe('getMediaQuery', () => {
  it('returns min-width for -up', () => {
    expect(getMediaQuery('md-up', defaultBreakpoints)).toBe('(min-width: 768px)');
  });
  it('returns max-width for -down', () => {
    expect(getMediaQuery('lg-down', defaultBreakpoints)).toBe('(max-width: 1024px)');
  });
  it('returns range for -only', () => {
    expect(getMediaQuery('sm-only', defaultBreakpoints)).toBe('(min-width: 640px) and (max-width: 767px)');
  });
  it('returns min-width for last breakpoint -only', () => {
    expect(getMediaQuery('2xl-only', defaultBreakpoints)).toBe('(min-width: 1536px)');
  });
  it('returns null for invalid breakpoint', () => {
    // @ts-expect-error
    expect(getMediaQuery('foo-up', defaultBreakpoints)).toBeNull();
  });
  it('returns null for invalid query type', () => {
    // @ts-expect-error
    expect(getMediaQuery('md-between', defaultBreakpoints)).toBeNull();
  });
});
