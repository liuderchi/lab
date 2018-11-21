const { default: <%- funcName %> } = require('./solution');

test('type of <%- funcName %> is function', () => {
  expect(typeof <%- funcName %>).toBe('function');
});

test('basic examples for <%- funcName %>()', () => {
  expect(<%- funcName %>(2)).toEqual(30);
});
