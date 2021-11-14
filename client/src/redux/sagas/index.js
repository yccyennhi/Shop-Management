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
  try {
    const SanPhams = yield call(api.fetchSanPhams);
    yield put(actions.getSanPhams.getSanPhamsSuccess(SanPhams.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getSanPhams.getSanPhamsFailure(err));
  }
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

function* fetchKhuyenMaisSaga(action) {
  try {
    const KhuyenMais = yield call(api.fetchKhuyenMais);
    yield put(actions.getKhuyenMais.getKhuyenMaisSuccess(KhuyenMais.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getKhuyenMais.getKhuyenMaisFailure(err));
  }
}

function* TaoSanPhamSaga(action) {
  try {
    const TaoSP = yield call(api.TaoSanPham, action.payload);
    console.log('[Sanpham]', TaoSP.data);
    yield put(actions.TaoSanPham.TaoSanPhamSuccess(TaoSP.data));
  } catch (err) {
    console.error(err);
    yield put(actions.TaoSanPham.TaoSanPhamFailure(err));
  }
}

function* mySaga() {
  yield takeLatest(actions.getKhachHangs.getKhachHangsRequest, fetchKhachHangsSaga);
  yield takeLatest(actions.getNhanViens.getNhanViensRequest, fetchNhanViensSaga);
  yield takeLatest(actions.getSanPhams.getSanPhamsRequest, fetchSanPhamsSaga);
  yield takeLatest(actions.getTaiKhoans.getTaiKhoansRequest, fetchTaiKhoansSaga);
  yield takeLatest(actions.getKhuyenMais.getKhuyenMaisRequest, fetchKhuyenMaisSaga);

}

export default mySaga;

