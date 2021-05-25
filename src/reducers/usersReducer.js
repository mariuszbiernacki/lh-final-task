import { actionsTypes } from "../actions/actionsTypes";

const initialState = {
  users: [],
};

const usersReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionsTypes.USERS_FETCH_SUCCEEDED:
      return {
        ...state,
        users: payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
