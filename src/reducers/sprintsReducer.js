import { actionsTypes } from "../actions/actionsTypes";

const initialState = {
  sprints: [],
};

const sprintsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionsTypes.SPRINTS_FETCH_SUCCEEDED:
      return {
        ...state,
        sprints: payload,
      };
    default:
      return state;
  }
};

export default sprintsReducer;
