import { call, put, takeEvery } from "redux-saga/effects";
import { actionsTypes } from "../actions/actionsTypes";
import apiComments from "../api/comments";

function* addComment(action) {
  const { payload } = action;
  const { newComment, history } = payload;
  const { push } = history;

  try {
    const response = yield call(apiComments.add, newComment);
    const addedComment = response.data;

    push("/tasks/" + addedComment.taskId);
  } catch (e) {
    // error to be add
  }
}

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
  yield takeEvery(actionsTypes.COMMENT_ADD_REQUESTED, addComment);
}

export default commentsSaga;
