import { call, put, takeEvery } from "redux-saga/effects";
import { actionsTypes } from "../actions/actionsTypes";
import apiSprints from "../api/sprints";

function* addSprint(action) {
  const { payload } = action;
  const { newSprint, history } = payload;
  const { push } = history;

  try {
    yield call(apiSprints.add, newSprint);
    push("/sprints/");
  } catch (error) {
    console.log(error);
  }
}

function* fetchSprints(action) {
  const { payload } = action;
  const { params } = payload;
  try {
    const response = yield call(apiSprints.getAll, params);
    const sprints = response.data;

    yield put({
      type: actionsTypes.SPRINTS_FETCH_SUCCEEDED,
      payload: sprints,
    });
  } catch (error) {
    yield put({
      type: actionsTypes.SPRINTS_FETCH_FAILED,
      payload: error,
    });
  }
}

function* fetchSprint(action) {
  const { payload } = action;
  const { id } = payload;
  try {
    const response = yield call(apiSprints.get, id);
    const sprint = response.data;

    yield put({
      type: actionsTypes.SPRINT_FETCH_SUCCEEDED,
      payload: sprint,
    });
  } catch (error) {
    yield put({
      type: actionsTypes.SPRINT_FETCH_FAILED,
      payload: error,
    });
  }
}

function* sprintsSaga() {
  yield takeEvery(actionsTypes.SPRINTS_FETCH_REQUESTED, fetchSprints);
  yield takeEvery(actionsTypes.SPRINT_ADD_REQUESTED, addSprint);
  yield takeEvery(actionsTypes.SPRINT_FETCH_REQUESTED, fetchSprint);
}

export default sprintsSaga;
