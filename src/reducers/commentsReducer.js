import { actionsTypes } from "../actions/actionsTypes";

const initialState = {
  comments: [],
};

const commentsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionsTypes.COMMENTS_FETCH_SUCCEEDED:
      return {
        ...state,
        comments: payload,
      };
    default:
      return state;
  }
};

export default commentsReducer;
