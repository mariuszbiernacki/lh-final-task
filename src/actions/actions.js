import { actionsTypes } from "./actionsTypes";

export const setProductsFromCms = (todo) => ({
  type: actionsTypes.TEST_TEST,
  payload: todo,
});

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

export const requestComments = () => ({
  type: actionsTypes.COMMENTS_FETCH_REQUESTED,
});
