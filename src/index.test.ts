import test from 'ava'

test('basic test', (t) => {
  const actual = 2 + 2
  const expected = 4
  t.is(actual, expected)
})
