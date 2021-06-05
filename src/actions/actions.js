import { actionsTypes } from "./actionsTypes";

export const requestUsers = () => ({
  type: actionsTypes.USERS_FETCH_REQUESTED,
});

export const requestTasks = (target, params) => ({
  type: actionsTypes.TASKS_FETCH_REQUESTED,
  payload: {
    target,
    params,
  },
});

export const requestComments = (params) => ({
  type: actionsTypes.COMMENTS_FETCH_REQUESTED,
  payload: {
    params,
  },
});

export const requestTask = (id) => ({
  type: actionsTypes.TASK_FETCH_REQUESTED,
  payload: {
    id,
  },
});

export const addTask = (newTask, history) => ({
  type: actionsTypes.TASK_ADD_REQUESTED,
  payload: {
    newTask,
    history,
  },
});

export const addComment = (newComment, history) => ({
  type: actionsTypes.COMMENT_ADD_REQUESTED,
  payload: {
    newComment,
    history,
  },
});

export const updateTask = (taskId, taskChanges) => ({
  type: actionsTypes.TASK_UPDATE_REQUESTED,
  payload: {
    taskId,
    taskChanges,
  },
});

export const requestSprints = (params) => ({
  type: actionsTypes.SPRINTS_FETCH_REQUESTED,
  payload: { params },
});

export const addSprint = (newSprint, history) => ({
  type: actionsTypes.SPRINT_ADD_REQUESTED,
  payload: {
    newSprint,
    history,
  },
});

export const requestSprint = (id) => ({
  type: actionsTypes.SPRINT_FETCH_REQUESTED,
  payload: { id },
});
