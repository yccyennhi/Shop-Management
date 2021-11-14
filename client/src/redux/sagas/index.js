import { takeLatest, call, put } from "redux-saga/effects";
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
  yield put(actions.getSanPhams.getSanPhamsSuccess(SanPhams));
}

function* fetchKhuyenMaisSaga(action) {
  try {
    const KhuyenMais = yield call(api.fetchKhuyenMais);
    yield put(actions.getKhuyenMais.getKhuyenMaisSuccess(KhuyenMais.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getKhuyenMais.getKhuyenMaisFailure(err));
  }
}

function* mySaga() {
  yield takeLatest(actions.getSanPhams.getSanPhamsRequest, fetchSanPhamsSaga);
   yield takeLatest(actions.getKhuyenMais.getKhuyenMaisRequest, fetchKhuyenMaisSaga);
}

export default mySaga;
