import { createActions, createAction } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};

export const getHoaDons = createActions({
  getHoaDonsRequest: undefined,
  getHoaDonsSuccess: (payload) => payload,
  getHoaDonsFailure: (err) => err,
});

//#region KhachHang
export const getKhachHangs = createActions({
  getKhachHangsRequest: undefined,
  getKhachHangsSuccess: (payload) => payload,
  getKhachHangsFailure: (err) => err,
});

export const createKhachHang = createActions({
  createKhachHangRequest: (payload) => payload,
  createKhachHangSuccess: (payload) => payload,
  createKhachHangFailure: (err) => err,
});

export const updateKhachHang = createActions({
  updateKhachHangRequest: (payload) => payload,
  updateKhachHangSuccess: (payload) => payload,
  updateKhachHangFailure: (err) => err,
});

export const showKhachHangModal = createAction("SHOW_KHACHHANG_MODAL");
export const hideKhachHangModal = createAction("HIDE_KHACHHANG_MODAL");
//#endregion

//#region NhanVien
export const getNhanViens = createActions({
  getNhanViensRequest: undefined,
  getNhanViensSuccess: (payload) => payload,
  getNhanViensFailure: (err) => err,
});

export const createNhanVien = createActions({
  createNhanVienRequest: (payload) => payload,
  createNhanVienSuccess: (payload) => payload,
  createNhanVienFailure: (err) => err,
});

export const updateNhanVien = createActions({
  updateNhanVienRequest: (payload) => payload,
  updateNhanVienSuccess: (payload) => payload,
  updateNhanVienFailure: (err) => err,
});

export const showNhanVienModal = createAction("SHOW_NHANVIEN_MODAL");
export const hideNhanVienModal = createAction("HIDE_NHANVIEN_MODAL");
//#endregion

//San Pham
export const getSanPhams = createActions({
  getSanPhamsRequest: undefined,
  getSanPhamsSuccess: (payload) => payload,
  getSanPhamsFailure: (err) => err,
});

export const createSanPham = createActions({
  createSanPhamRequest: (payload) => payload,
  createSanPhamSuccess: (payload) => payload,
  createSanPhamFailure: (err) => err,
});

export const updateSanPham = createActions({
  updateSanPhamRequest: (payload) => payload,
  updateSanPhamSuccess: (payload) => payload,
  updateSanPhamFailure: (err) => err,
});

export const deleteSanPham = createActions({
  deleteSanPhamRequest: (payload) => payload,
  deleteSanPhamSuccess: (payload) => payload,
  deleteSanPhamFailure: (err) => err,
});

//Phieu Hen

export const getPhieuHens = createActions({
  getPhieuHensRequest: undefined,
  getPhieuHensSuccess: (payload) => payload,
  getPhieuHensFailure: (err) => err,
});

export const createPhieuHen = createActions({
  createPhieuHenRequest: (payload) => payload,
  createPhieuHenSuccess: (payload) => payload,
  createPhieuHenFailure: (err) => err,
});

export const updatePhieuHen = createActions({
  updatePhieuHenRequest: (payload) => payload,
  updatePhieuHenSuccess: (payload) => payload,
  updatePhieuHenFailure: (err) => err,
});

export const deletePhieuHen = createActions({
  deletePhieuHenRequest: (payload) => payload,
  deletePhieuHenSuccess: (payload) => payload,
  deletePhieuHenFailure: (err) => err,
});


//PhieuBaoHanhFeature

export const getPhieuBaoHanhs = createActions({
  getPhieuBaoHanhsRequest: undefined,
  getPhieuBaoHanhsSuccess: (payload) => payload,
  getPhieuBaoHanhsFailure: (err) => err,
});

export const createPhieuBaoHanh = createActions({
  createPhieuBaoHanhRequest: (payload) => payload,
  createPhieuBaoHanhSuccess: (payload) => payload,
  createPhieuBaoHanhFailure: (err) => err,
});

export const updatePhieuBaoHanh = createActions({
  updatePhieuBaoHanhRequest: (payload) => payload,
  updatePhieuBaoHanhSuccess: (payload) => payload,
  updatePhieuBaoHanhFailure: (err) => err,
});

export const deletePhieuBaoHanh = createActions({
  deletePhieuBaoHanhRequest: (payload) => payload,
  deletePhieuBaoHanhSuccess: (payload) => payload,
  deletePhieuBaoHanhFailure: (err) => err,
});

//#region TaiKhoan
export const getTaiKhoans = createActions({
  getTaiKhoansRequest: undefined,
  getTaiKhoansSuccess: (payload) => payload,
  getTaiKhoansFailure: (err) => err,
});

export const createTaiKhoan = createActions({
  createTaiKhoanRequest: (payload) => payload,
  createTaiKhoanSuccess: (payload) => payload,
  createTaiKhoanFailure: (err) => err,
});

export const updateTaiKhoan = createActions({
  updateTaiKhoanRequest: (payload) => payload,
  updateTaiKhoanSuccess: (payload) => payload,
  updateTaiKhoanFailure: (err) => err,
});
//#endregion

//PhieuNhapFeature


export const getPhieuNhaps = createActions({
  getPhieuNhapsRequest: undefined,
  getPhieuNhapsSuccess: (payload) => payload,
  getPhieuNhapsFailure: (err) => err,
});

export const createPhieuNhap = createActions({
  createPhieuNhapRequest: (payload) => payload,
  createPhieuNhapSuccess: (payload) => payload,
  createPhieuNhapFailure: (err) => err,
});

export const updatePhieuNhap = createActions({
  updatePhieuNhapRequest: (payload) => payload,
  updatePhieuNhapSuccess: (payload) => payload,
  updatePhieuNhapFailure: (err) => err,
});

export const deletePhieuNhap = createActions({
  deletePhieuNhapRequest: (payload) => payload,
  deletePhieuNhapSuccess: (payload) => payload,
  deletePhieuNhapFailure: (err) => err,
});


/* #region  KhuyenMaiFeature */
export const getKhuyenMais = createActions({
  getKhuyenMaisRequest: undefined,
  getKhuyenMaisSuccess: (payload) => payload,
  getKhuyenMaisFailure: (err) => err,
});

export const createKhuyenMai = createActions({
  createKhuyenMaiRequest: (payload) => payload,
  createKhuyenMaiSuccess: (payload) => payload,
  createKhuyenMaiFailure: (err) => err,
});

export const updateKhuyenMai = createActions({
  updateKhuyenMaiRequest: (payload) => payload,
  updateKhuyenMaiSuccess: (payload) => payload,
  updateKhuyenMaiFailure: (err) => err,
});

export const deleteKhuyenMai = createActions({
  deleteKhuyenMaiRequest: (payload) => payload,
  deleteKhuyenMaiSuccess: (payload) => payload,
  deleteKhuyenMaiFailure: (err) => err,
});
/* #endregion */

export const getPhieuDoiTras = createActions({
  getPhieuDoiTrasRequest: undefined,
  getPhieuDoiTrasSuccess: (payload) => payload,
  getPhieuDoiTrasFailure: (err) => err,
});

export const getCTHDs = createActions({
  getCTHDsRequest: undefined,
  getCTHDsSuccess: (payload) => payload,
  getCTHDsFailure: (err) => err,
});

export const getCTPDTs = createActions({
  getCTPDTsRequest: undefined,
  getCTPDTsSuccess: (payload) => payload,
  getCTPDTsFailure: (err) => err,
});

export const createHoaDon = createActions({
  createHoaDonRequest: (payload) => payload,
  createHoaDonSuccess: (payload) => payload,
  createHoaDonFailure: (err) => err,
})

export const createCTHD = createActions({
  createCTHDRequest: (payload) => payload,
  createCTHDSuccess: (payload) => payload,
  createCTHDFailure: (err) => err,
})


export const createPhieuDoiTra = createActions({
  createPhieuDoiTraRequest: (payload) => payload,
  createPhieuDoiTraSuccess: (payload) => payload,
  createPhieuDoiTraFailure: (err) => err,
})

export const createCTPDT = createActions({
  createCTPDTRequest: (payload) => payload,
  createCTPDTSuccess: (payload) => payload,
  createCTPDTFailure: (err) => err,
})

 /* Tổng quan*/
export const getTongQuans = createActions({
  getDataRequest: undefined,
  getDataSuccess: (payload) => payload,
  getDataFailure: (err) => err,

  getStatistics: (payload) => payload,
  getRankingByDoanhThu: (payload) => payload,
  getHighestSanPhamList: (payload) => payload,
});

/* #endregion */
/* #region  BaoCao */

export const getCuoiNgays = createActions({
  getCuoiNgaysRequest: undefined,
  getCuoiNgaysSuccess: (payload) => payload,
  getCuoiNgaysFailure: (err) => err,
});

export const getBCBanHangs = createActions({
  getBCBanHangsRequest: undefined,
  getBCBanHangsSuccess: (payload) => payload,
  getBCBanHangsFailure: (err) => err,
});

export const getBCHangHoas = createActions({
  getBCHangHoasRequest: undefined,
  getBCHangHoasSuccess: (payload) => payload,
  getBCHangHoasFailure: (err) => err,
});
/* #endregion */


export const showTaoSanPhamModal = createAction("SHOW_TAOSANPHAM_MODAL");
export const hideTaoSanPhamModal = createAction("HIDE_TAOSANPHAM_MODAL");

export const setIdThemPhieuNhapPage = createAction("SET_IDTHEMPHIEUNHAP_PAGE");


export const showTaoPhieuBaoHanhModal = createAction("SHOW_TAOPHIEUBAOHANH_MODAL");
export const hideTaoPhieuBaoHanhModal = createAction("HIDE_TAOPHIEUBAOHANH_MODAL");

export const showTaoPhieuHenModal = createAction("SHOW_TAOPHIEUHEN_MODAL");
export const hideTaoPhieuHenModal = createAction("HIDE_TAOPHIEUHEN_MODAL");

export const showTaoHoaDonModal = createAction("SHOW_TAOHOADON_MODAL");
export const hideTaoHoaDonModal = createAction("HIDE_TAOHOADON_MODAL");

export const showTaoPhieuTraHangModal = createAction(
  "SHOW_TAOPHIEUTRAHANG_MODAL"
);
export const hideTaoPhieuTraHangModal = createAction(
  "HIDE_TAOPHIEUTRAHANG_MODAL"
);

export const showModal = createAction('SHOW_CREATE_MODAL');
export const hideModal = createAction('HIDE_CREATE_MODAL');

export const showTaoPhieuNhapModal = createAction("SHOW_TAOPHIEUNHAP_MODAL");
export const hideTaoPhieuNhapModal = createAction("HIDE_TAOPHIEUNHAP_MODAL");

