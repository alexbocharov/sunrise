import { getQueryParams } from './addQueryParams';

describe('addQueryParams.test', () => {
  it('test with one param', () => {
    const params = getQueryParams({
      test: 'value',
    });

    expect(params).toEqual('?test=value');
  });

  it('test with multiple param', () => {
    const params = getQueryParams({
      test1: 'value1',
      test2: 'value2',
    });

    expect(params).toEqual('?test1=value1&test2=value2');
  });

  it('test with one param undefined', () => {
    const params = getQueryParams({
      test1: 'value1',
      test2: undefined,
    });

    expect(params).toEqual('?test1=value1');
  });
});
