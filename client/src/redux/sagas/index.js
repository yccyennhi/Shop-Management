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
function* createKhuyenMaiSaga(action) {
  try {
    const KhuyenMai = yield call(api.createKhuyenMai, action.payload);
    console.log('createKhuyenMaiSaga', KhuyenMai)
    yield put(actions.createKhuyenMai.createKhuyenMaiSuccess(KhuyenMai.data));
  } catch (err) {
    console.error(err);
    yield put(actions.createKhuyenMai.createKhuyenMaiFailure(err));
  }
}

function* fetchHoaDonsSaga(action) {
  try {
    const HoaDons = yield call(api.fetchHoaDons);
    console.log('[HoaDons]', HoaDons);
    yield put(actions.getHoaDons.getHoaDonsSuccess(HoaDons.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getHoaDons.getHoaDonsFailure(err));
  }
}

function* fetchCTHDsSaga(action) {
  try {
    const CTHDs = yield call(api.fetchCTHDs);
    yield put(actions.getCTHDs.getCTHDsSuccess(CTHDs.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getCTHDs.getCTHDsFailure(err));
  }
}

function* fetchPhieuDoiTrasSaga(action) {
  try {
    const PhieuDoiTras = yield call(api.fetchPhieuDoiTras);
    yield put(actions.getPhieuDoiTras.getPhieuDoiTrasSuccess(PhieuDoiTras.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getPhieuDoiTras.getPhieuDoiTrasFailure(err));
  }
}


function* mySaga() {
  yield takeLatest(actions.getKhachHangs.getKhachHangsRequest, fetchKhachHangsSaga);
  yield takeLatest(actions.getNhanViens.getNhanViensRequest, fetchNhanViensSaga);
  yield takeLatest(actions.getSanPhams.getSanPhamsRequest, fetchSanPhamsSaga);
  yield takeLatest(actions.getTaiKhoans.getTaiKhoansRequest, fetchTaiKhoansSaga);

  
  yield takeLatest(actions.getHoaDons.getHoaDonsRequest, fetchHoaDonsSaga);
  yield takeLatest(actions.getCTHDs.getCTHDsRequest, fetchCTHDsSaga);
  yield takeLatest(actions.getPhieuDoiTras.getPhieuDoiTrasDsRequest, fetchPhieuDoiTrasSaga);
  //KhuyenMai
  yield takeLatest(actions.getKhuyenMais.getKhuyenMaisRequest, fetchKhuyenMaisSaga);
  yield takeLatest(actions.createKhuyenMai.createKhuyenMaiRequest, createKhuyenMaiSaga);
}

export default mySaga;

