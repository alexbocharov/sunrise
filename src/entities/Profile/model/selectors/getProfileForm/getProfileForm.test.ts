import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileForm } from './getProfileForm';

describe('getProfileForm.test', () => {
  it('should return profile form', () => {
    const form = {
      firstname: 'Ivan',
      lastname: 'Ivanov',
      age: 32,
      city: 'Moscow',
      username: 'admin',
      avatar: '',
    };

    const state: DeepPartial<StateSchema> = {
      profile: {
        form,
      },
    };

    expect(getProfileForm(state as StateSchema)).toEqual(form);
  });

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});
