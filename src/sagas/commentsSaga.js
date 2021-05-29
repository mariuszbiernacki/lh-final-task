import { call, put, takeEvery } from "redux-saga/effects";
import { actionsTypes } from "../actions/actionsTypes";
import apiComments from "../api/comments";

function* fetchComments(action) {
  const { payload } = action;
  const { params } = payload;
  try {
    const response = yield call(apiComments.getAll, params);
    const comments = response.data;

    yield put({
      type: actionsTypes.COMMENTS_FETCH_SUCCEEDED,
      payload: comments,
    });
  } catch (e) {
    yield put({
      type: actionsTypes.COMMENTS_FETCH_FAILED,
      message: e.message,
    });
  }
}

function* commentsSaga() {
  yield takeEvery(actionsTypes.COMMENTS_FETCH_REQUESTED, fetchComments);
}

export default commentsSaga;
