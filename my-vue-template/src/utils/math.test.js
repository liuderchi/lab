import { add } from './math';

test('math > add()', () => {
  expect(add(1, 2)).toBe(3);
  expect(add(1, '2')).toBe('12');
  expect(add(1)).toBe(NaN);
  expect(add()).toBe(NaN);
});
