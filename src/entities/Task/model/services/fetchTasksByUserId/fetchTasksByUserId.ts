import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Task } from '../../types/task';
import { getTasksPageLimit, getTasksPageNum } from '../../selectors/task';

interface FetchTasksProps {
  userId: string;
  replace?: boolean;
}

export const fetchTasksByUserId = createAsyncThunk<
  Task[],
  FetchTasksProps,
  ThunkConfig<string>
>('tasks/fetchTasksByUserId', async ({ userId }, thunkAPI) => {
  const { extra, rejectWithValue, getState } = thunkAPI;

  const page = getTasksPageNum(getState());
  const limit = getTasksPageLimit(getState());

  try {
    const response = await extra.api.get<Task[]>('/tasks', {
      params: {
        userId,
        _expand: 'user',
        _page: page,
        _limit: limit,
      },
    });

    if (!response || !response.data) {
      throw new Error();
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue('Error');
  }
});
