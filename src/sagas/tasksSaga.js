import { call, put, select, takeEvery } from "redux-saga/effects";
import { requestSprint, requestTasks } from "../actions/actions";
import { actionsTypes } from "../actions/actionsTypes";
import apiTasks from "../api/tasks";
import apiTaskChanges from "../api/task_changes";

function* updateTask(action) {
  const { payload } = action;
  const { taskId, taskChanges } = payload;
  const { sprintId } = taskChanges;

  try {
    const response = yield call(apiTasks.update, taskId, taskChanges);
    const updatedTask = response.data;

    yield call(apiTaskChanges.add, {
      taskId: parseInt(taskId),
      type: !isNaN(sprintId) ? "sprint_changed" : "user_changed",
      createdAt: parseInt(new Date().getTime() / 1000),
    });

    yield put({
      type: actionsTypes.TASK_FETCH_SUCCEEDED,
      payload: updatedTask,
    });

    if (!isNaN(sprintId)) {
      yield put(
        requestTasks("sprintlessTasks", {
          sprintId: 0,
        })
      );
      const sprint = yield select((state) => state.sprints.selectedSprint);
      yield put(requestSprint(sprint.id));
    }
  } catch (error) {
    yield put({
      type: actionsTypes.TASK_FETCH_FAILED,
      payload: error,
    });
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
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    yield put({
      type: actionsTypes.TASKS_FETCH_FAILED,
      payload: error,
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
  } catch (error) {
    yield put({
      type: actionsTypes.TASK_FETCH_FAILED,
      payload: error,
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
