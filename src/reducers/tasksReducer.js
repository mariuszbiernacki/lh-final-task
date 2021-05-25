import { actionsTypes } from "../actions/actionsTypes";

const initialState = {
  tasks: [],
  myTasks: [],
  newTasks: [],
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
    default:
      return state;
  }
};

export default tasksReducer;
