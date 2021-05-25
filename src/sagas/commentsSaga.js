import { call, put, takeLatest } from "redux-saga/effects";
import { actionsTypes } from "../actions/actionsTypes";
import apiComments from "../api/comments";

function* fetchComments() {
  try {
    const response = yield call(apiComments.getAll);
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
  yield takeLatest(actionsTypes.COMMENTS_FETCH_REQUESTED, fetchComments);
}

export default commentsSaga;
