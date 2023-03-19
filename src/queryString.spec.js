import { queryString, parse } from './queryString';

describe('Object to query string', () => {
  it('should return a query string', () => {
    const obj = { name: 'John', age: 30 };
    const result = queryString(obj);

    expect(result).toBe('name=John&age=30');
  });

  it('should return a query string from an object with an array', () => {
    const obj = { name: 'John', abilities: ['JS', 'Jest'] };
    const result = queryString(obj);

    expect(result).toBe('name=John&abilities=JS,Jest');
  });

  it('should throw am erro from an object with a deep nested object', () => {
    const obj = {
      name: 'John',
      abilities: { ability1: 'JS', ability2: 'Jest' },
    };

    expect(() => queryString(obj)).toThrow();
  });
});

describe('Query string to object', () => {
  it('should return an object', () => {
    const string = 'name=John&age=30';
    const result = parse(string);

    expect(result).toEqual({ name: 'John', age: '30' });
  });

  it('should return an object from single key-value pattern', () => {
    const string = 'name=John';
    const result = parse(string);

    expect(result).toEqual({ name: 'John' });
  });

  it('should return an object from property with an array', () => {
    const string = 'name=John&abilities=JS,TDD';
    const result = parse(string);

    expect(result).toEqual({ name: 'John', abilities: ['JS', 'TDD'] });
  });
});
