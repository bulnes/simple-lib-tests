import { sum } from './calculator';

it('should sum 2 and 2 and the result must be 4', () => {
  expect(sum(2, 2)).toBe(4);
});

it('should sum 2 and 2 even one of them is not a number and the result must be 4', () => {
  expect(sum(2, '2')).toBe(4);
  expect(sum('2', 2)).toBe(4);
  expect(sum('2', '2')).toBe(4);
});

it('should throw an error if one of the parameters is not a number', () => {
  expect(() => sum(2, 'a')).toThrowError();
  expect(() => sum('a', 2)).toThrowError();
  expect(() => sum('a', 'a')).toThrowError();
  expect(() => sum()).toThrowError();
  expect(() => sum({})).toThrowError();
  expect(() => sum([2, 2])).toThrowError();
});
