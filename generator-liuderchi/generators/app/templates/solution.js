/*
給一組數字和目標，e.g. [2,3,5,7]和7，請找出數組中能組合出目標的組合，數組中的數字能夠重複使用
    Answer Example: [7], [2,5], [2,2,3]
*/

// https://leetcode.com/problems/combination-sum/#/description
// https://leetcode.com/problems/combination-sum/#/solutions

var combinationSum = function(candidates, target) {
  var res = [];
  var combination = [];
  var recursive = function(combination, _target, start, res) {
    // combination: current combination
    // _target: current target
    // start: starting index of candidates
    // res: result

    // end condition: _target is equal or less than zero
    if (_target < 0) return;
    if (_target === 0) {
      //_target is zero: copy combination and push to res
      res.push(combination.slice());
      return;
    }

    for (var i = start; i < candidates.length; i++) {
      combination.push(candidates[i]);
      recursive(combination, _target - candidates[i], i, res);
      combination.pop();
    }
  };

  candidates.sort(function(a, b) {
    return a - b;
  });
  recursive(combination, target, 0, res);
  return res;
};

console.log(combinationSum([2, 3, 5, 7], 7)); // [7], [2,5], [2,2,3]
console.log(combinationSum([2, 3, 5], 7)); // [2,5], [2,2,3]

// NOTE borrow test case from #523 continuous-subarray-sum
console.log(combinationSum([1, 2, 3], 6)); // true
console.log(combinationSum([0], 0)); // false

exports.default = combinationSum;
