import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Task } from '../../types/task';
import { getTasksPageLimit, getTasksPageNum } from '../../selectors/task';

interface FetchTasksProps {
  accessToken: string;
  replace?: boolean;
}

export const fetchTasksByUserAccessToken = createAsyncThunk<
  Task[],
  FetchTasksProps,
  ThunkConfig<string>
>('tasks/fetchTasksByUserAccessToken', async ({ accessToken }, thunkAPI) => {
  const { extra, rejectWithValue, getState } = thunkAPI;

  const page = getTasksPageNum(getState());
  const limit = getTasksPageLimit(getState());

  try {
    const response = await extra.api.get('/api/v1/assignments', {
      params: {
        accessToken,
        _page: page,
        _limit: limit,
      },
    });

    if (!response || !response.data) {
      throw new Error();
    }

    return response.data.assignments;
  } catch (err) {
    console.log(err);
    return rejectWithValue('Error');
  }
});
