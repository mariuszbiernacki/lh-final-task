import { call, put, takeEvery } from "redux-saga/effects";
import { actionsTypes } from "../actions/actionsTypes";
import apiUsers from "../api/users";

function* fetchUsers() {
  try {
    const response = yield call(apiUsers.getAll);
    const users = response.data;

    yield put({
      type: actionsTypes.USERS_FETCH_SUCCEEDED,
      payload: users,
    });
  } catch (e) {
    yield put({
      type: actionsTypes.USERS_FETCH_FAILED,
      message: e.message,
    });
  }
}

function* usersSaga() {
  yield takeEvery(actionsTypes.USERS_FETCH_REQUESTED, fetchUsers);
}

export default usersSaga;
