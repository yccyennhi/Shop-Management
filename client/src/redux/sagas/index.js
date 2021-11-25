import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";

function* fetchKhachHangsSaga(action) {
  try {
    const KhachHangs = yield call(api.fetchKhachHangs);
    console.log("[KhachHangs]", KhachHangs);
    yield put(actions.getKhachHangs.getKhachHangsSuccess(KhachHangs));
  } catch (err) {
    console.err(err);
    yield put(actions.getKhachHangs.getKhachHangsFailure(err));
  }
}

function* fetchNhanViensSaga(action) {
  try {
    const NhanViens = yield call(api.fetchNhanViens);
    console.log("[NhanViens]", NhanViens);
    yield put(actions.getNhanViens.getNhanViensSuccess(NhanViens));
  } catch (err) {
    console.err(err);
    yield put(actions.getNhanViens.getNhanViensFailure(err));
  }
}

function* fetchSanPhamsSaga(action) {
  try {
    const SanPhams = yield call(api.fetchSanPhams);
    console.log("[NhanViens]", SanPhams);

    yield put(actions.getSanPhams.getSanPhamsSuccess(SanPhams.data));
  } catch (err) {
    console.err(err);
    yield put(actions.getSanPhams.getSanPhamsFailure(err));
  }
}

function* fetchPhieuBaoHanhsSaga(action) {
  try {
    const PhieuBaoHanhs = yield call(api.fetchPhieuBaoHanhs);
    yield put(
      actions.getPhieuBaoHanhs.getPhieuBaoHanhsSuccess(PhieuBaoHanhs.data)
    );
  } catch (err) {
    console.err(err);
    yield put(actions.getPhieuBaoHanhs.getPhieuBaoHanhsFailure(err));
  }
}

function* fetchPhieuHensSaga(action) {
  try {
    const PhieuHens = yield call(api.fetchPhieuHens);
    yield put(actions.getPhieuHens.getPhieuHensSuccess(PhieuHens.data));
  } catch (err) {
    console.err(err);
    yield put(actions.getPhieuHens.getPhieuHensFailure(err));
  }
}

function* fetchTaiKhoansSaga(action) {
  try {
    const TaiKhoans = yield call(api.fetchTaiKhoans);
    console.log("[TaiKhoans]", TaiKhoans);
    yield put(actions.getTaiKhoans.getTaiKhoansSuccess(TaiKhoans));
  } catch (err) {
    console.err(err);
    yield put(actions.getTaiKhoans.getTaiKhoansFailure(err));
  }
}
/* #region  KhuyenMaiSaga */

function* fetchKhuyenMaisSaga(action) {
  try {
    const KhuyenMais = yield call(api.fetchKhuyenMais);
    yield put(actions.getKhuyenMais.getKhuyenMaisSuccess(KhuyenMais.data));
  } catch (err) {
    yield put(actions.getKhuyenMais.getKhuyenMaisFailure(err));
  }
}

function* createKhuyenMaiSaga(action) {
  try {
    const KhuyenMai = yield call(api.createKhuyenMai, action.payload);
    yield put(actions.createKhuyenMai.createKhuyenMaiSuccess(KhuyenMai.data));
  } catch (error) {
    yield put(
      actions.createKhuyenMai.createKhuyenMaiFailure(error.response.data)
    );
  }
}

function* updateKhuyenMaiSaga(action) {
  try {
    const KhuyenMai = yield call(api.updateKhuyenMai, action.payload);
    yield put(actions.updateKhuyenMai.updateKhuyenMaiSuccess(KhuyenMai.data));
  } catch (err) {
    yield put(
      actions.updateKhuyenMai.updateKhuyenMaiFailure(err.response.data)
    );
  }
}

function* deleteKhuyenMaiSaga(action) {
  try {
    const KhuyenMai = yield call(api.deleteKhuyenMai, action.payload);
    yield put(
      actions.deleteKhuyenMai.deleteKhuyenMaiSuccess(KhuyenMai.data._id)
    );
  } catch (err) {
      yield put(
        actions.deleteKhuyenMai.deleteKhuyenMaiFailure(err.response.data)
      );
  }
}
/* #endregion */

/* #region  SanPham */

function* createSanPhamSaga(action) {
  try {
    const SanPham = yield call(api.createSanPham, action.payload);
    console.log("createSanPhamSaga", SanPham);
    yield put(actions.createSanPham.createSanPhamSuccess(SanPham.data));
  } catch (err) {
    console.err(err);
    yield put(actions.createSanPham.createSanPhamFailure(err));
  }
}
function* updateSanPhamSaga(action) {
  try {
    const SanPham = yield call(api.updateSanPham, action.payload);
    console.log("updateSanPhamSaga", SanPham.data);
    yield put(actions.updateSanPham.updateSanPhamSuccess(SanPham.data));
  } catch (err) {
    console.err(err);
    yield put(actions.updateSanPham.updateSanPhamFailure(err));
  }
}

function* deleteSanPhamSaga(action) {
  try {
    const SanPham = yield call(api.deleteSanPham, action.payload);
    yield put(actions.deleteSanPham.deleteSanPhamSuccess(SanPham.data._id));
  } catch (err) {
    console.err(err);
    yield put(actions.deleteSanPham.deleteSanPhamFailure(err.response.data));
  }
}
/* #endregion */

/* #region  PhieuHen */

function* createPhieuHenSaga(action) {
  try {
    const PhieuHen = yield call(api.createPhieuHen, action.payload);
    console.log("createPhieuHenSaga", PhieuHen);
    yield put(actions.createPhieuHen.createPhieuHenSuccess(PhieuHen.data));
  } catch (err) {
    console.err(err);
    yield put(actions.createPhieuHen.createPhieuHenFailure(err));
  }
}
function* updatePhieuHenSaga(action) {
  try {
    const PhieuHen = yield call(api.updatePhieuHen, action.payload);
    console.log("updatePhieuHenSaga", PhieuHen.data);
    yield put(actions.updatePhieuHen.updatePhieuHenSuccess(PhieuHen.data));
  } catch (err) {
    console.err(err);
    yield put(actions.updatePhieuHen.updatePhieuHenFailure(err));
  }
}

function* deletePhieuHenSaga(action) {
  try {
    const PhieuHen = yield call(api.deletePhieuHen, action.payload);
    yield put(actions.deletePhieuHen.deletePhieuHenSuccess(PhieuHen.data._id));
  } catch (err) {
    console.err(err);
    yield put(actions.deletePhieuHen.deletePhieuHenFailure(err));
  }
}
/* #endregion */

/* #region  PhieuBaoHanh */

function* createPhieuBaoHanhSaga(action) {
  try {
    const PhieuBaoHanh = yield call(api.createPhieuBaoHanh, action.payload);
    console.log("createPhieuBaoHanhSaga", PhieuBaoHanh);
    yield put(
      actions.createPhieuBaoHanh.createPhieuBaoHanhSuccess(PhieuBaoHanh.data)
    );
  } catch (err) {
    console.err(err);
    yield put(actions.createPhieuBaoHanh.createPhieuBaoHanhFailure(err));
  }
}
function* updatePhieuBaoHanhSaga(action) {
  try {
    const PhieuBaoHanh = yield call(api.updatePhieuBaoHanh, action.payload);
    console.log("updatePhieuBaoHanhSaga", PhieuBaoHanh.data);
    yield put(
      actions.updatePhieuBaoHanh.updatePhieuBaoHanhSuccess(PhieuBaoHanh.data)
    );
  } catch (err) {
    console.err(err);
    yield put(actions.updatePhieuBaoHanh.updatePhieuBaoHanhFailure(err));
  }
}

function* deletePhieuBaoHanhSaga(action) {
  try {
    const PhieuBaoHanh = yield call(api.deletePhieuBaoHanh, action.payload);
    yield put(
      actions.deletePhieuBaoHanh.deletePhieuBaoHanhSuccess(
        PhieuBaoHanh.data._id
      )
    );
  } catch (err) {
    console.err(err);
    yield put(actions.deletePhieuBaoHanh.deletePhieuBaoHanhFailure(err));
  }
}
/* #endregion */

/* #region Giao dich */

function* fetchHoaDonsSaga(action) {
  try {
    const HoaDons = yield call(api.fetchHoaDons);
    yield put(actions.getHoaDons.getHoaDonsSuccess(HoaDons.data));
  } catch (err) {
    console.err(err);
    yield put(actions.getHoaDons.getHoaDonsFailure(err));
  }
}

function* fetchPhieuDoiTrasSaga(action) {
  try {
    const PhieuDoiTras = yield call(api.fetchTraHangs);
    yield put(
      actions.getPhieuDoiTras.getPhieuDoiTrasSuccess(PhieuDoiTras.data)
    );
  } catch (err) {
    console.err(err);
    yield put(actions.getPhieuDoiTras.getPhieuDoiTrasFailure(err));
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
function* fetchCTPDTsSaga(action) {
  try {
    const CTPDTs = yield call(api.fetchCTPDTs);
    yield put(actions.getCTPDTs.getCTPDTsSuccess(CTPDTs.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getCTPDTs.getCTPDTsFailure(err));
  }
}
function* createHoaDonSaga(action) {
  try {
    const HoaDon = yield call(api.createHoaDon, action.payload);
    yield put(actions.createHoaDon.createHoaDonSuccess(HoaDon.data));
  } catch (error) {
    yield put(actions.createHoaDon.createHoaDonFailure(error.response.data));
  }
}
function* createCTHDSaga(action) {
  try {
    const CTHD = yield call(api.createCTHD, action.payload);
    yield put(actions.createCTHD.createCTHDSuccess(CTHD.data));
  } catch (error) {
    yield put(actions.createCTHD.createCTHDFailure(error.response.data));
  }
}

function* updateSLKMSaga(action) {
  try {
    const SLKM = yield call(api.updateSLKM, action.payload);
    yield put(
      actions.updateSLKM.updateSLKMSuccess(SLKM.data)
    );
  } catch (err) {
    console.err(err);
    yield put(actions.updateSLKM.updateSLKMFailure(err));
  }
}
/* #endregion */

function*  getTongQuansSaga(action) {
  try {
    const HoaDonsToday = yield call(api.getHoaDonsToday);
    const DoiTrasToday = yield call(api.getDoiTrasToday);

    var tongDoanhThu = 0;
    var tongSoLuongDT = 0;

    Object.values(HoaDonsToday.data).forEach((HoaDon) => {
      Object.entries(HoaDon).forEach(([key, value]) => {
        if (key === "ThanhTien") tongDoanhThu += value;
      });
    });
    Object.values(DoiTrasToday.data).forEach((DoiTra) => {
      Object.entries(DoiTra).forEach(([key, value]) => {
        if (key === "SoLuong") tongSoLuongDT += value;
      });
    });

    const statistics = {
      hoaDonTodayCount: HoaDonsToday.data.length,
      doanhThuToday: tongDoanhThu,
      doiTraCount: DoiTrasToday.data.length,
      soLuongDT: tongSoLuongDT,
    };

    yield put(actions.getTongQuans.getStatistics(statistics));

    //Ranking
    const rankingList = yield call(api.getRanking);

    yield put(actions.getTongQuans.getRankingByDoanhThu(rankingList.data));

    //highestSanPhamList
    const highestSanPhamList = yield call(api.getHighestSanPhamList);

    yield put(actions.getTongQuans.getHighestSanPhamList(highestSanPhamList.data));

  } catch (error) {
    console.log(error);
  }
}

function* mySaga() {
  yield takeLatest(
    actions.getKhachHangs.getKhachHangsRequest,
    fetchKhachHangsSaga
  );
  yield takeLatest(
    actions.getNhanViens.getNhanViensRequest,
    fetchNhanViensSaga
  );
  yield takeLatest(
    actions.getTaiKhoans.getTaiKhoansRequest,
    fetchTaiKhoansSaga
  );

  /* #region  SanPham */

  yield takeLatest(actions.getSanPhams.getSanPhamsRequest, fetchSanPhamsSaga);

  yield takeLatest(
    actions.createSanPham.createSanPhamRequest,
    createSanPhamSaga
  );

  yield takeLatest(
    actions.updateSanPham.updateSanPhamRequest,
    updateSanPhamSaga
  );
  yield takeLatest(
    actions.deleteSanPham.deleteSanPhamRequest,
    deleteSanPhamSaga
  );
  /* #endregion */

  /* #region  PhieuBaoHanh */

  yield takeLatest(
    actions.getPhieuBaoHanhs.getPhieuBaoHanhsRequest,
    fetchPhieuBaoHanhsSaga
  );

  yield takeLatest(
    actions.createPhieuBaoHanh.createPhieuBaoHanhRequest,
    createPhieuBaoHanhSaga
  );

  yield takeLatest(
    actions.updatePhieuBaoHanh.updatePhieuBaoHanhRequest,
    updatePhieuBaoHanhSaga
  );
  yield takeLatest(
    actions.deletePhieuBaoHanh.deletePhieuBaoHanhRequest,
    deletePhieuBaoHanhSaga
  );
  /* #endregion */

  /* #region  PhieuHen */

  yield takeLatest(
    actions.getPhieuHens.getPhieuHensRequest,
    fetchPhieuHensSaga
  );

  yield takeLatest(
    actions.createPhieuHen.createPhieuHenRequest,
    createPhieuHenSaga
  );

  yield takeLatest(
    actions.getTaiKhoans.getTaiKhoansRequest,
    fetchTaiKhoansSaga
  );

  
  yield takeLatest(
    actions.updatePhieuHen.updatePhieuHenRequest,
    updatePhieuHenSaga
  );
  yield takeLatest(
    actions.deletePhieuHen.deletePhieuHenRequest,
    deletePhieuHenSaga
  );
  /* #endregion */

  yield takeLatest(
    actions.getTaiKhoans.getTaiKhoansRequest,
    fetchTaiKhoansSaga
  );
  yield takeLatest(actions.getHoaDons.getHoaDonsRequest, fetchHoaDonsSaga);
  yield takeLatest(
    actions.getPhieuDoiTras.getPhieuDoiTrasRequest,
    fetchPhieuDoiTrasSaga
  );

  /* #region  KhuyenMai */
  yield takeLatest(
    actions.getKhuyenMais.getKhuyenMaisRequest,
    fetchKhuyenMaisSaga
  );
  yield takeLatest(
    actions.createKhuyenMai.createKhuyenMaiRequest,
    createKhuyenMaiSaga
  );

  yield takeLatest(
    actions.updateKhuyenMai.updateKhuyenMaiRequest,
    updateKhuyenMaiSaga
  );
  yield takeLatest(
    actions.deleteKhuyenMai.deleteKhuyenMaiRequest,
    deleteKhuyenMaiSaga
  );
  /* #endregion */

  /* #region  GiaoD dich */
  yield takeLatest(actions.getHoaDons.getHoaDonsRequest, fetchHoaDonsSaga);
  yield takeLatest(
    actions.getPhieuDoiTras.getPhieuDoiTrasRequest,
    fetchPhieuDoiTrasSaga
  );
  yield takeLatest(actions.getCTHDs.getCTHDsRequest, fetchCTHDsSaga);
  yield takeLatest(actions.getCTPDTs.getCTPDTsRequest, fetchCTPDTsSaga);
  yield takeLatest(actions.createHoaDon.createHoaDonRequest, createHoaDonSaga);
  yield takeLatest(actions.createCTHD.createCTHDRequest, createCTHDSaga);
  yield takeLatest(actions.updateSLKM.updateSLKMRequest, updateSLKMSaga);

  /* #endregion */
  yield takeLatest(actions.getTongQuans.getDataRequest, getTongQuansSaga);
}

export default mySaga;
