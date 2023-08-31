import { loginByUsername } from '../services/loginByUserName/loginByUserName';
import { LoginSchema } from '../types/LoginSchema';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice.test', () => {
  it('test set username', () => {
    const state: DeepPartial<LoginSchema> = { username: 'Ivan' };

    expect(loginReducer(state as LoginSchema, loginActions.setUsername('Ivan2')))
      .toEqual({ username: 'Ivan2' });
  });

  it('test set password', () => {
    const state: DeepPartial<LoginSchema> = { password: '123' };

    expect(loginReducer(state as LoginSchema, loginActions.setPassword('1234')))
      .toEqual({ password: '1234' });
  });

  it('test set isLoading', () => {
    const state: DeepPartial<LoginSchema> = {
      isLoading: false,
      error: 'Error',
    };

    expect(loginReducer(state as LoginSchema, loginByUsername.pending))
      .toEqual({
        isLoading: true,
        error: undefined,
      });
  });
});
