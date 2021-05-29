import { all, call, put, takeEvery } from "redux-saga/effects";
import { actionsTypes } from "../actions/actionsTypes";
import apiTasks from "../api/tasks";

function* addTask(action) {
  const { payload } = action;
  const { newTask, history } = payload;
  const { push } = history;

  try {
    const response = yield call(apiTasks.add, newTask);
    const addedTask = response.data;

    push("/tasks/" + addedTask.id);
  } catch (e) {
    //
  }
}

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

function* fetchTask(action) {
  const { payload } = action;
  const { id } = payload;
  try {
    const response = yield call(apiTasks.get, id);
    const task = response.data;

    yield put({
      type: actionsTypes.TASK_FETCH_SUCCEEDED,
      payload: task,
    });
  } catch (e) {
    yield put({
      type: actionsTypes.TASK_FETCH_FAILED,
      message: e.message,
    });
  }
}

function* tasksSaga() {
  yield all([
    takeEvery(actionsTypes.TASK_ADD_REQUESTED, addTask),
    takeEvery(actionsTypes.TASKS_FETCH_REQUESTED, fetchTasks),
    takeEvery(actionsTypes.TASK_FETCH_REQUESTED, fetchTask),
  ]);
}

export default tasksSaga;
