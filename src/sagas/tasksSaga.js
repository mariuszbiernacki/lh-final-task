import { call, put, takeEvery } from "redux-saga/effects";
import { actionsTypes } from "../actions/actionsTypes";
import apiTasks from "../api/tasks";
import apiTaskChanges from "../api/task_changes";

function* updateTask(action) {
  const { payload } = action;
  const { taskId, taskChanges } = payload;
  try {
    const response = yield call(apiTasks.update, taskId, taskChanges);
    const updatedTask = response.data;

    yield call(apiTaskChanges.add, {
      taskId: parseInt(taskId),
      type: "user_changed",
      createdAt: parseInt(new Date().getTime() / 1000),
    });

    yield put({
      type: actionsTypes.TASK_FETCH_SUCCEEDED,
      payload: updatedTask,
    });
  } catch (e) {
    // error to be add
  }
}

function* addTask(action) {
  const { payload } = action;
  const { newTask, history } = payload;
  const { push } = history;

  try {
    const response = yield call(apiTasks.add, newTask);
    const addedTask = response.data;

    push("/tasks/" + addedTask.id);
  } catch (e) {
    // error to be add
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
  yield takeEvery(actionsTypes.TASK_ADD_REQUESTED, addTask);
  yield takeEvery(actionsTypes.TASKS_FETCH_REQUESTED, fetchTasks);
  yield takeEvery(actionsTypes.TASK_FETCH_REQUESTED, fetchTask);
  yield takeEvery(actionsTypes.TASK_UPDATE_REQUESTED, updateTask);
}

export default tasksSaga;
