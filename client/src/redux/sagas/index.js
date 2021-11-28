import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";

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

//#region KhachHang
function* fetchPhieuNhapsSaga(action) {
  try {
    const PhieuNhaps = yield call(api.fetchPhieuNhaps);
    console.log("[NhanViens]", PhieuNhaps);

    yield put(actions.getPhieuNhaps.getPhieuNhapsSuccess(PhieuNhaps.data));
  } catch (err) {
    console.err(err);
    yield put(actions.getPhieuNhaps.getPhieuNhapsFailure(err));
  }
}


//#region KhachHang
function* fetchKhachHangsSaga(action) {
  try {
    const KhachHangs = yield call(api.fetchKhachHangs);
    // console.log("[KhachHangs]", KhachHangs);
    yield put(actions.getKhachHangs.getKhachHangsSuccess(KhachHangs.data));
  } catch (err) {
    console.err(err);
    yield put(actions.getKhachHangs.getKhachHangsFailure(err));
  }
}

function* createKhachHangSaga(action) {
  try {
    const KhachHang = yield call(api.createKhachHang, action.payload);
    yield put(actions.createKhachHang.createKhachHangSuccess(KhachHang.data));
  } catch (error) {
    yield put(
      actions.createKhachHang.createKhachHangFailure(error.response.data)
    );
  }
}

function* updateKhachHangSaga(action) {
  try {
    const KhachHang = yield call(api.updateKhachHang, action.payload);
    yield put(actions.updateKhachHang.updateKhachHangSuccess(KhachHang.data));
  } catch (error) {
    yield put(
      actions.updateKhachHang.updateKhachHangFailure(error.response.data)
    );
  }
}
//#endregion

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

//#region NhanVien
function* fetchNhanViensSaga(action) {
  try {
    const NhanViens = yield call(api.fetchNhanViens);
    console.log("[NhanViens]", NhanViens);
    yield put(actions.getNhanViens.getNhanViensSuccess(NhanViens.data));
  } catch (err) {
    console.err(err);
    yield put(actions.getNhanViens.getNhanViensFailure(err));
  }
}

function* createNhanViensSaga(action) {
  try {
    const NhanVien = yield call(api.createNhanVien, action.payload);
    yield put(actions.createNhanVien.createNhanVienSuccess(NhanVien.data));
  } catch (error) {
    yield put(
      actions.createNhanVien.createNhanVienFailure(error.response.data)
    );
  }
}

function* updateNhanVienSaga(action) {
  try {
    const NhanVien = yield call(api.updateNhanVien, action.payload);
    yield put(actions.updateNhanVien.updateNhanVienSuccess(NhanVien.data));
  } catch (error) {
    yield put(
      actions.updateNhanVien.updateNhanVienFailure(error.response.data)
    );
  }
}
//#endregion

/* #region  SanPham */

function* fetchSanPhamsSaga(action) {
  try {
    const SanPhams = yield call(api.fetchSanPhams);
    console.log("[SanPhams]", SanPhams);

    yield put(actions.getSanPhams.getSanPhamsSuccess(SanPhams.data));
  } catch (err) {
    console.err(err);
    yield put(actions.getSanPhams.getSanPhamsFailure(err));
  }
}

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

/* #region  PhieuNhap */

function* createPhieuNhapSaga(action) {
  try {
    const PhieuNhap = yield call(api.createPhieuNhap, action.payload);
    console.log("createPhieuNhapSaga", PhieuNhap);
    yield put(actions.createPhieuNhap.createPhieuNhapSuccess(PhieuNhap.data));
  } catch (err) {
    console.err(err);
    yield put(actions.createPhieuNhap.createPhieuNhapFailure(err));
  }
}
function* updatePhieuNhapSaga(action) {
  try {
    const PhieuNhap = yield call(api.updatePhieuNhap, action.payload);
    console.log("updatePhieuNhapSaga", PhieuNhap.data);
    yield put(actions.updatePhieuNhap.updatePhieuNhapSuccess(PhieuNhap.data));
  } catch (err) {
    console.err(err);
    yield put(actions.updatePhieuNhap.updatePhieuNhapFailure(err));
  }
}

function* deletePhieuNhapSaga(action) {
  try {
    const PhieuNhap = yield call(api.deletePhieuNhap, action.payload);
    yield put(
      actions.deletePhieuNhap.deletePhieuNhapSuccess(PhieuNhap.data._id)
    );
  } catch (err) {
    console.err(err);
    yield put(
      actions.deletePhieuNhap.deletePhieuNhapFailure(err.response.data)
    );
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
function* createPhieuDoiTraSaga(action) {
  try {
    const PhieuDoiTra = yield call(api.createPhieuDoiTra, action.payload);
    yield put(actions.createPhieuDoiTra.createPhieuDoiTraSuccess(PhieuDoiTra.data));
  } catch (error) {
    yield put(actions.createPhieuDoiTra.createPhieuDoiTraFailure(error.response.data));
  }
}
function* createCTPDTSaga(action) {
  try {
    const CTPDT = yield call(api.createCTPDT, action.payload);
    yield put(actions.createCTPDT.createCTPDTSuccess(CTPDT.data));
  } catch (error) {
    yield put(actions.createCTPDT.createCTPDTFailure(error.response.data));
  }
}


/* #endregion */

/* #region  TongQuan */
function* getTongQuansSaga(action) {
  try {
    const HoaDonsToday = yield call(api.getHoaDonsToday);
    const DoiTrasToday = yield call(api.getDoiTrasToday);

    var tongSoLuongDT = 0;

    Object.values(DoiTrasToday.data).forEach((DoiTra) => {
      Object.entries(DoiTra).forEach(([key, value]) => {
        if (key === "SoLuong") tongSoLuongDT += value;
      });
    });

    const {today, lastToday} = HoaDonsToday.data;
    const compareLastMonth = Math.round((today['DoanhThu'] - lastToday['DoanhThu'])/today['DoanhThu'])*100;

    const statistics = {
      hoaDonTodayCount: today['SoLuong'],
      doanhThuToday: today['DoanhThu'],
      doiTraCount: DoiTrasToday.data.length,
      soLuongDT: tongSoLuongDT,
      percent:compareLastMonth?compareLastMonth:0,
    };

    yield put(actions.getTongQuans.getStatistics(statistics));

    //Ranking
    const rankingList = yield call(api.getRanking);

    yield put(actions.getTongQuans.getRankingByDoanhThu(rankingList.data));

    //highestSanPhamList
    const highestSanPhamList = yield call(api.getHighestSanPhamList);

    yield put(
      actions.getTongQuans.getHighestSanPhamList(highestSanPhamList.data)
    );
    yield put(actions.getTongQuans.getDataSuccess());
  } catch (error) {
    console.log(error);
  }
}

function* getCuoiNgaysSaga(action) {
  try {
    const CuoiNgays = yield call(api.getCuoiNgays);
    yield put(actions.getCuoiNgays.getCuoiNgaysSuccess(CuoiNgays.data));
  } catch (err) {
    yield put(actions.getCuoiNgays.getCuoiNgaysFailure(err));
  }
}

function* getBCBanHangsSaga(action) {
  try {
    const BCBanHangs = yield call(api.getBCBanHangs);
    yield put(actions.getBCBanHangs.getBCBanHangsSuccess(BCBanHangs.data));
  } catch (err) {
    yield put(actions.getBCBanHangs.getBCBanHangsFailure(err));
  }
}

function* getBCHangHoasSaga(action) {
  try {
    const BCHangHoas = yield call(api.getBCHangHoas);
    yield put(actions.getBCHangHoas.getBCHangHoasSuccess(BCHangHoas.data));
  } catch (err) {
    yield put(actions.getBCHangHoas.getBCHangHoasFailure(err));
  }
}
/* #endregion */

//#region TaiKhoan
function* fetchTaiKhoansSaga(action) {
  try {
    const TaiKhoans = yield call(api.fetchTaiKhoans);
    console.log("[TaiKhoans]", TaiKhoans);
    yield put(actions.getTaiKhoans.getTaiKhoansSuccess(TaiKhoans.data));
  } catch (err) {
    console.err(err);
    yield put(actions.getTaiKhoans.getTaiKhoansFailure(err));
  }
}
// #endregion

function* mySaga() {
  //#region KhachHang
  yield takeLatest(
    actions.getKhachHangs.getKhachHangsRequest,
    fetchKhachHangsSaga
  );

  yield takeLatest(
    actions.createKhachHang.createKhachHangRequest,
    createKhachHangSaga
  );

  yield takeLatest(
    actions.updateKhachHang.updateKhachHangRequest,
    updateKhachHangSaga
  );
  //#endregion

  //#region NhanVien
  yield takeLatest(
    actions.getNhanViens.getNhanViensRequest,
    fetchNhanViensSaga
  );

  yield takeLatest(
    actions.createNhanVien.createNhanVienRequest,
    createNhanViensSaga
  );

  yield takeLatest(
    actions.updateNhanVien.updateNhanVienRequest,
    updateNhanVienSaga
  );
  //#endregion

  //#region TaiKhoan
  yield takeLatest(
    actions.getTaiKhoans.getTaiKhoansRequest,
    fetchTaiKhoansSaga
  );
  //#endregion

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
    actions.updatePhieuHen.updatePhieuHenRequest,
    updatePhieuHenSaga
  );
  yield takeLatest(
    actions.deletePhieuHen.deletePhieuHenRequest,
    deletePhieuHenSaga
  );
  /* #endregion */

  /* #region  PhieuNhap */

  yield takeLatest(
    actions.getPhieuNhaps.getPhieuNhapsRequest,
    fetchPhieuNhapsSaga
  );

  yield takeLatest(
    actions.createPhieuNhap.createPhieuNhapRequest,
    createPhieuNhapSaga
  );

  yield takeLatest(
    actions.updatePhieuNhap.updatePhieuNhapRequest,
    updatePhieuNhapSaga
  );
  yield takeLatest(
    actions.deletePhieuNhap.deletePhieuNhapRequest,
    deletePhieuNhapSaga
  );
  /* #endregion */

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
  yield takeLatest(actions.createPhieuDoiTra.createPhieuDoiTraRequest, createPhieuDoiTraSaga);
  yield takeLatest(actions.createCTPDT.createCTPDTRequest, createCTPDTSaga);
  
  /* #endregion */

  /* #region  TongQuan */
  yield takeLatest(actions.getTongQuans.getDataRequest, getTongQuansSaga);
  /* #endregion */

 /* #region  BaoCao */
  yield takeLatest(actions.getCuoiNgays.getCuoiNgaysRequest, getCuoiNgaysSaga);

  yield takeLatest(
    actions.getBCBanHangs.getBCBanHangsRequest,
    getBCBanHangsSaga
  );

  yield takeLatest(
    actions.getBCHangHoas.getBCHangHoasRequest,
    getBCHangHoasSaga
  );
 /* #endregion */
}

export default mySaga;
