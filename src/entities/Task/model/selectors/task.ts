import { StateSchema } from 'app/providers/StoreProvider';

// export const getTasks = (state: StateSchema) => state.tasks?.data;
export const getTasksIsLoading = (state: StateSchema) =>
  state.tasks?.isLoading || false;
export const getTasksError = (state: StateSchema) => state.tasks?.error || '';
export const getTasksInited = (state: StateSchema) =>
  state.tasks?._inited || false;
export const getTasksHasMore = (state: StateSchema) =>
  state.tasks?.hasMore || false;
export const getTasksPageNum = (state: StateSchema) => state.tasks?.page || 1;
export const getTasksPageLimit = (state: StateSchema) =>
  state.tasks?.limit || 5;
