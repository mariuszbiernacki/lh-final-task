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
  } catch (error) {
    yield put({
      type: actionsTypes.USERS_FETCH_FAILED,
      payload: error,
    });
  }
}

function* usersSaga() {
  yield takeEvery(actionsTypes.USERS_FETCH_REQUESTED, fetchUsers);
}

export default usersSaga;
