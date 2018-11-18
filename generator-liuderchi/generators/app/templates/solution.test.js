const { default: combinationSum } = require('./solution');

test('type of combinationSum is function', () => {
  expect(typeof combinationSum).toBe('function');
});

test('basic examples for combinationSum()', () => {
  expect(combinationSum([2, 3, 5, 7], 7)).toEqual([[2, 2, 3], [2, 5], [7]]);
});
