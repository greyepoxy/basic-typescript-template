import test from 'ava';
import { test as testCode } from '../src';

test('A test test', (t) => {
  t.deepEqual(testCode, 5);
});
