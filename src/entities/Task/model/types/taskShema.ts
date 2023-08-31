import { EntityState } from '@reduxjs/toolkit';
import { Task } from './task';

// export interface TaskSchema {
//   isLoading: boolean;
//   error?: string;
//   data?: Task[];
// }

export interface TasksSchema extends EntityState<Task> {
  isLoading?: boolean;
  error?: string;

  // pagination
  page: number;
  limit: number;
  hasMore: boolean;

  // initialization
  _inited: boolean;
}
