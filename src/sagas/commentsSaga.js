import { call, put, takeEvery } from "redux-saga/effects";
import { actionsTypes } from "../actions/actionsTypes";
import apiComments from "../api/comments";
import apiTaskChanges from "../api/task_changes";

function* addComment(action) {
  const { payload } = action;
  const { newComment, history } = payload;
  const { push } = history;

  try {
    const response = yield call(apiComments.add, newComment);
    const addedComment = response.data;

    yield call(apiTaskChanges.add, {
      taskId: newComment.taskId,
      type: "comment_added",
      createdAt: parseInt(new Date().getTime() / 1000),
    });

    push("/tasks/" + addedComment.taskId);
  } catch (error) {
    yield put({
      type: actionsTypes.COMMENTS_FETCH_FAILED,
      payload: error,
    });
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
  } catch (error) {
    yield put({
      type: actionsTypes.COMMENTS_FETCH_FAILED,
      payload: error,
    });
  }
}

function* commentsSaga() {
  yield takeEvery(actionsTypes.COMMENTS_FETCH_REQUESTED, fetchComments);
  yield takeEvery(actionsTypes.COMMENT_ADD_REQUESTED, addComment);
}

export default commentsSaga;
