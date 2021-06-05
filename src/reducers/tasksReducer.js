import { actionsTypes } from "../actions/actionsTypes";

const initialState = {
  tasks: [],
  myTasks: [],
  newTasks: [],
  inprogressTasks: [],
  reviewTasks: [],
  doneTasks: [],
  sprintlessTasks: [],
  selectedTask: null,
};

const tasksReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionsTypes.TASKS_FETCH_SUCCEEDED:
      return {
        ...state,
        [payload.target]: payload.tasks,
      };
    case actionsTypes.TASK_FETCH_SUCCEEDED:
      return {
        ...state,
        selectedTask: payload,
      };
    default:
      return state;
  }
};

export default tasksReducer;
