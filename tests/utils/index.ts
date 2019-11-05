const util = require('../../src/utils');

test('mergeObservables', () => {
  expect(util.mergeObservables({test: {a: 1}}, {test: {b: 1}})).toStrictEqual({test: {a: 1, b: 1}});
  expect(util.mergeObservables({test: {a: 1}})).toStrictEqual({test: {a: 1}});
});
