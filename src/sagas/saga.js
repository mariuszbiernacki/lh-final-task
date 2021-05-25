import tasksSaga from "../sagas/tasksSaga";
import usersSaga from "../sagas/usersSaga";
import commentsSaga from "../sagas/commentsSaga";
import { all, fork } from "@redux-saga/core/effects";

function* rootSaga() {
  yield all([fork(tasksSaga), fork(usersSaga), fork(commentsSaga)]);
}

export default rootSaga;
