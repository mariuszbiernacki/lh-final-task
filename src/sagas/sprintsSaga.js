import { call, put, takeEvery } from "redux-saga/effects";
import { actionsTypes } from "../actions/actionsTypes";
import apiSprints from "../api/sprints";

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
  } catch (e) {
    yield put({
      type: actionsTypes.SPRINTS_FETCH_FAILED,
      message: e.message,
    });
  }
}

function* sprintsSaga() {
  yield takeEvery(actionsTypes.SPRINTS_FETCH_REQUESTED, fetchSprints);
}

export default sprintsSaga;
