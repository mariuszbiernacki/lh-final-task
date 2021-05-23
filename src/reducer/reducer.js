import { actionsTypes } from "../actions/actionsTypes";

const initialState = {
  todo: [],
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // case actionsTypes.TEST:
    //   const test = state.todo.find(
    //     (el) => el.name === payload
    //   );
    //   return {
    //     ...state,
    //     todo: test,
    //   };
    default:
      return state;
  }
};

export default reducer;
