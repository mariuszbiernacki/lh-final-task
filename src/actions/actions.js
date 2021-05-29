import { actionsTypes } from "./actionsTypes";

export const requestUsers = () => ({
  type: actionsTypes.USERS_FETCH_REQUESTED,
});

export const requestTasks = (target, params) => ({
  type: actionsTypes.TASKS_FETCH_REQUESTED,
  payload: {
    target: target,
    params: params,
  },
});

export const requestComments = (params) => ({
  type: actionsTypes.COMMENTS_FETCH_REQUESTED,
  payload: {
    params: params,
  },
});

export const requestTask = (id) => ({
  type: actionsTypes.TASK_FETCH_REQUESTED,
  payload: {
    id: id,
  },
});
