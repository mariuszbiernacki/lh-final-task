import { call, put, takeLatest } from "redux-saga/effects";
import { actionsTypes } from "../actions/actionsTypes";
import apiTasks from "../api/tasks";

function* fetchTasks(action) {
  const { payload } = action;
  const { target, params } = payload;

  try {
    const response = yield call(apiTasks.getAll, params);
    const tasks = response.data;

    yield put({
      type: actionsTypes.TASKS_FETCH_SUCCEEDED,
      payload: {
        target: target,
        tasks: tasks,
      },
    });
  } catch (e) {
    yield put({
      type: actionsTypes.TASKS_FETCH_FAILED,
      message: e.message,
    });
  }
}

function* tasksSaga() {
  yield takeLatest(actionsTypes.TASKS_FETCH_REQUESTED, fetchTasks);
}

export default tasksSaga;
