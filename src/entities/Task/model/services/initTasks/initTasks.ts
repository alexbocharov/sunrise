import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getUserAuthData } from 'entities/User';
import { getTasksInited } from '../../selectors/task';
import { taskActions } from '../../slice/taskSlice';
import { fetchTasksByUserAccessToken } from '../fetchTasksByUserAccessToken/fetchTasksByUserAccessToken';

export const initTasks = createAsyncThunk<void, void, ThunkConfig<string>>(
  'tasks/initTasks',
  async (_, thunkApi) => {
    const { dispatch, getState } = thunkApi;

    const inited = getTasksInited(getState());

    const authData = getUserAuthData(getState());

    if (!inited && authData) {
      dispatch(taskActions.initState());
      // dispatch(fetchTasksByUserId({ userId: authData?.id }));
      dispatch(
        fetchTasksByUserAccessToken({
          accessToken: authData?.accessToken || '',
        }),
      );
    }
  },
);
