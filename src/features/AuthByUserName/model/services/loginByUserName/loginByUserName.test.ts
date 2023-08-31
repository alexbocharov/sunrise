import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk/TestAsyncThunk';
import { loginByUsername } from './loginByUserName';

// jest.mock('axios');

// const mockedAxios = jest.mocked(axios, true);

describe('loginByUserName.test', () => {
  // let dispatch: Dispatch;
  // let getState: () => StateSchema;

  // beforeEach(() => {
  //   dispatch = jest.fn();
  //   getState = jest.fn();
  // });

  // it('success login', async () => {
  //   const userValue = { username: 'username', id: '1' };

  //   mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));

  //   const action = loginByUsername({ username: 'username', password: '123' });
  //   const result = await action(dispatch, getState, undefined);

  //   expect(mockedAxios.post).toHaveBeenCalled();
  //   expect(dispatch).toBeCalledWith(userActions.setAuthData(userValue));
  //   expect(dispatch).toBeCalledTimes(3);
  //   expect(result.meta.requestStatus).toBe('fulfilled');
  //   expect(result.payload).toEqual(userValue);
  // });

  // it('error login', async () => {
  //   mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));

  //   const action = loginByUsername({ username: 'username', password: '123' });
  //   const result = await action(dispatch, getState, undefined);

  //   expect(mockedAxios.post).toHaveBeenCalled();
  //   expect(dispatch).toBeCalledTimes(2);
  //   expect(result.meta.requestStatus).toBe('rejected');
  //   expect(result.payload).toEqual('Error');
  // });

  it('success login', async () => {
    const userValue = { username: 'username', id: '1' };

    // mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));

    const thunk = new TestAsyncThunk(loginByUsername);
    thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));
    const result = await thunk.callThunk({ username: 'username', password: '123' });

    expect(thunk.dispatch).toBeCalledWith(userActions.setAuthData(userValue));
    expect(thunk.dispatch).toBeCalledTimes(3);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(userValue);
  });

  it('error login', async () => {
    // mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));

    const thunk = new TestAsyncThunk(loginByUsername);
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk({ username: 'username', password: '123' });

    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('Error');
  });
});
