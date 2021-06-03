import { actionsTypes } from "../actions/actionsTypes";

const initialState = {
  sprints: [],
  selectedSprint: null,
};

const sprintsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionsTypes.SPRINTS_FETCH_SUCCEEDED:
      return {
        ...state,
        sprints: payload,
      };
    case actionsTypes.SPRINT_FETCH_SUCCEEDED:
      return {
        ...state,
        selectedSprint: payload,
      };
    default:
      return state;
  }
};

export default sprintsReducer;
