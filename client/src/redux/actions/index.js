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

export const getSanPhams = createActions({
  getSanPhamsRequest: undefined,
  getSanPhamsSuccess: (payload) => payload,
  getSanPhamsFailure: (err) => err,
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

export const createSanPham = createActions({
    createSanPhamRequest: (payload) => payload,
    createSanPhamSuccess: (payload) => payload,
    createSanPhamFailure: (err) => err,
});


/* #endregion */

export const showTaoSanPhamModal = createAction('SHOW_TAOSANPHAM_MODAL');
export const hideTaoSanPhamModal = createAction('HIDE_TAOSANPHAM_MODAL');

export const showModal = createAction("SHOW_CREATE_MODAL");
export const hideModal = createAction("HIDE_CREATE_MODAL");
