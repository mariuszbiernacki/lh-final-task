import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import commentsReducer from "../reducers/commentsReducer";
import tasksReducer from "../reducers/tasksReducer";
import usersReducer from "../reducers/usersReducer";
import commentsSaga from "../sagas/commentsSaga";
import tasksSaga from "../sagas/tasksSaga";
import usersSaga from "../sagas/usersSaga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    users: usersReducer,
    tasks: tasksReducer,
    comments: commentsReducer,
  }),
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(tasksSaga);
sagaMiddleware.run(usersSaga);
sagaMiddleware.run(commentsSaga);

export default store;
