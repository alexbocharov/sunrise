import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { TasksSchema } from '../types/taskShema';
import { fetchTasksByUserId } from '../services/fetchTasksByUserId/fetchTasksByUserId';
import { Task } from '../types/task';
import { fetchTasksByUserAccessToken } from '../services/fetchTasksByUserAccessToken/fetchTasksByUserAccessToken';

// const initialState: TasksSchema = {
//   isLoading: false,
//   error: undefined,
//   data: undefined,
// };

const tasksAdapter = createEntityAdapter<Task>({
  selectId: (task) => task.id,
});

export const getTasks = tasksAdapter.getSelectors<StateSchema>(
  (state) => state.tasks || tasksAdapter.getInitialState(),
);

export const taskDetailsSlice = createSlice({
  name: 'tasksSlice',
  initialState: tasksAdapter.getInitialState<TasksSchema>({
    isLoading: false,
    error: '',
    page: 1,
    limit: 4,
    hasMore: true,
    ids: [],
    entities: {},
    _inited: false,
  }),
  reducers: {
    initState: (state) => {
      state._inited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksByUserId.pending, (state, action) => {
        state.isLoading = true;
        state.error = undefined;

        if (action.meta.arg.replace) {
          tasksAdapter.removeAll(state);
        }
      })
      .addCase(fetchTasksByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasMore = action.payload.length >= state.limit;

        if (action.meta.arg.replace) {
          tasksAdapter.setAll(state, action.payload);
        } else if (action.payload.length > 0) {
          tasksAdapter.addMany(state, action);
        }
      })
      .addCase(fetchTasksByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchTasksByUserAccessToken.pending, (state, action) => {
        state.isLoading = true;
        state.error = undefined;

        if (action.meta.arg.replace) {
          tasksAdapter.removeAll(state);
        }
      })
      .addCase(fetchTasksByUserAccessToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasMore = action.payload.length >= state.limit;

        if (action.meta.arg.replace) {
          tasksAdapter.setAll(state, action.payload);
        } else if (action.payload.length > 0) {
          tasksAdapter.addMany(state, action);
        }
      })
      .addCase(fetchTasksByUserAccessToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: taskReducer } = taskDetailsSlice;
export const { actions: taskActions } = taskDetailsSlice;
