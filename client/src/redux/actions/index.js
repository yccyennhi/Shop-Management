import { createActions, createAction } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};

export const getHoaDons = createActions({
  getHoaDonsRequest: undefined,
  getHoaDonsSuccess: (payload) => payload,
  getHoaDonsFailure: (err) => err,
});

export const getKhachHangs = createActions({
  getKhachHangsRequest: undefined,
  getKhachHangsSuccess: (payload) => payload,
  getKhachHangsFailure: (err) => err,
});

export const getNhanViens = createActions({
  getNhanViensRequest: undefined,
  getNhanViensSuccess: (payload) => payload,
  getNhanViensFailure: (err) => err,
});
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

//Phieu bao hanh

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

export const getTaiKhoans = createActions({
  getTaiKhoansRequest: undefined,
  getTaiKhoansSuccess: (payload) => payload,
  getTaiKhoansFailure: (err) => err,
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
})

export const getCTHDs = createActions({
  getCTHDsRequest: undefined,
  getCTHDsSuccess: (payload) => payload,
  getCTHDsFailure: (err) => err,
})

export const getCTPDTs = createActions({
  getCTPDTsRequest: undefined,
  getCTPDTsSuccess: (payload) => payload,
  getCTPDTsFailure: (err) => err,
})

export const getTongQuans = createActions({
  getDataRequest: undefined,
  getDataSuccess: (payload) => payload,
  getDataFailure: (err) => err,

  getStatistics: (payload) => payload,
  getRankingByDoanhThu: (payload) => payload,
  getHighestSanPhamList: (payload) => payload,

})


export const createHoaDon = createAction({});


export const showTaoSanPhamModal = createAction("SHOW_TAOSANPHAM_MODAL");
export const hideTaoSanPhamModal = createAction("HIDE_TAOSANPHAM_MODAL");

export const showUpdateSanPhamModal = createAction("SHOW_UPDATESANPHAM_MODAL");
export const hideUpdateSanPhamModal = createAction("HIDE_UPDATESANPHAM_MODAL");

export const showTaoHoaDonModal = createAction("SHOW_TAOHOADON_MODAL");
export const hideTaoHoaDonModal = createAction("HIDE_TAOHOADON_MODAL");

export const showTaoPhieuTraHangModal = createAction(
  "SHOW_TAOPHIEUTRAHANG_MODAL"
);
export const hideTaoPhieuTraHangModal = createAction(
  "HIDE_TAOPHIEUTRAHANG_MODAL"
);

export const showModal = createAction("SHOW_CREATE_MODAL");
export const hideModal = createAction("HIDE_CREATE_MODAL");

export const showTatCaTrangThai = createAction("SHOW_TATCATRANGTHAI");
export const showConHanTrangThai = createAction("HIDE_CONHANTRANGTHAI");
export const showHetHanTrangThai = createAction("HIDE_HETHANTRANGTHAI");
