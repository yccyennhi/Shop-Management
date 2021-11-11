import { takeLatest, call } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";

function* fetchSanPhamsSaga(action) {
  // try {
  //   const posts = yield call(api.fetchSanPhamSaga);
  //   yield put(actions.getPosts.getSanPhamRequest(posts.data));
  // } catch (err) {
  //   console.error(err);
  //   yield put(actions.getPosts.getSanPhamFailure(err));
  // }
  const SanPhams = yield call(api.fetchSanPhams);
  console.log("[SanPhams]", SanPhams);
}

function* mySaga() {
  yield takeLatest(actions.getSanPhams.getSanPhamsRequest, fetchSanPhamsSaga);
}

export default mySaga;
