import { ValidateProfileError } from '../../types/ProfileSchema';
import { validateProfileData } from './validateProfileData';

const data = {
  firstname: 'Ivan',
  lastname: 'Ivanov',
  age: 32,
  city: 'Moscow',
  username: 'admin',
  avatar: '',
};

describe('validateProfileData.test', () => {
  it('success', async () => {
    const result = validateProfileData(data);

    expect(result).toEqual([]);
  });

  it('no data', async () => {
    const result = validateProfileData();

    expect(result).toEqual([ValidateProfileError.NO_DATA]);
  });

  it('without firstname and lastname', async () => {
    const result = validateProfileData({
      ...data,
      firstname: '',
      lastname: '',
    });

    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });

  it('incorrect age', async () => {
    const result = validateProfileData({ ...data, age: undefined });

    expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
  });

  it('incorrect all', async () => {
    const result = validateProfileData({});

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
    ]);
  });
});
