import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { User, userActions } from 'entities/User';

interface LoginByUserNameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUserNameProps,
  ThunkConfig<string>
>('login/loginByUsername', async (authData, thunkAPI) => {
  const { extra, dispatch, rejectWithValue, getState } = thunkAPI;

  try {
    // const encodedBytes = utf8Encode(
    //   `${authData.username}:${authData.password}`,
    // );
    // const encodedString = base64Encode(encodedBytes);

    const response = await extra.api.post(
      '/login',
      // '/api/v1/auth',
      // headers: {
      //   Authorization: `Basic ${encodedString}`,
      // },
      {
        username: authData.username,
        password: authData.password,
      },
    );

    console.log({ response });

    if (!response.data || !response.data.success) {
      throw new Error();
    }

    // const userInfo = await extra.api.get(
    //   `/api/v1/EmployeeInfo?accessToken=${response.data.accessToken}`,
    // );

    // localStorage.setItem(
    //   LOCAL_STORAGE_USER_KEY,
    //   JSON.stringify({ ...response.data, ...userInfo.data.employee }),
    // );

    // dispatch(
    //   userActions.setAuthData({ ...response.data, ...userInfo.data.employee }),
    // );

    dispatch(userActions.setAuthData({ ...response.data }));

    return response.data;
  } catch (e) {
    return rejectWithValue('Error');
  }
});
