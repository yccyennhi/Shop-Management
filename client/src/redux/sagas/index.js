import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";

function* fetchKhachHangsSaga(action) {
  try {
    const KhachHangs = yield call(api.fetchKhachHangs);
    console.log("[KhachHangs]", KhachHangs);
    yield put(actions.getKhachHangs.getKhachHangsSuccess(KhachHangs));
  } catch (err) {
    console.error(err);
    yield put(actions.getKhachHangs.getKhachHangsFailure(err));
  }
}

function* fetchNhanViensSaga(action) {
  try {
    const NhanViens = yield call(api.fetchNhanViens);
    console.log("[NhanViens]", NhanViens);
    yield put(actions.getNhanViens.getNhanViensSuccess(NhanViens));
  } catch (err) {
    console.error(err);
    yield put(actions.getNhanViens.getNhanViensFailure(err));
  }
}

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

function* fetchTaiKhoansSaga(action) {
  try {
    const TaiKhoans = yield call(api.fetchTaiKhoans);
    console.log("[TaiKhoans]", TaiKhoans);
    yield put(actions.getTaiKhoans.getTaiKhoansSuccess(TaiKhoans));
  } catch (err) {
    console.error(err);
    yield put(actions.getTaiKhoans.getTaiKhoansFailure(err));
  }
}

function* mySaga() {
  yield takeLatest(actions.getKhachHangs.getKhachHangsRequest, fetchKhachHangsSaga);
  yield takeLatest(actions.getNhanViens.getNhanViensRequest, fetchNhanViensSaga);
  yield takeLatest(actions.getSanPhams.getSanPhamsRequest, fetchSanPhamsSaga);
  yield takeLatest(actions.getTaiKhoans.getTaiKhoansRequest, fetchTaiKhoansSaga);
}

export default mySaga;
