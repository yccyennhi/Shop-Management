import {createActions, createAction} from 'redux-actions';

export const getType = (reduxAction) => {
    return reduxAction().type;
}

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


export const createSanPham = createActions({
    createSanPhamRequest: (payload) => payload,
    createSanPhamSuccess: (payload) => payload,
    createSanPhamFailure: (err) => err,
});

export const getPhieuDoiTras = createActions({
    getPhieuDoiTrasRequest: undefined,
    getPhieuDoiTrasSuccess: (payload) => payload,
    getPhieuDoiTrasFailure: (err) => err,
})

export const createHoaDon = createAction({

})

export const showTaoSanPhamModal = createAction('SHOW_TAOSANPHAM_MODAL');
export const hideTaoSanPhamModal = createAction('HIDE_TAOSANPHAM_MODAL');

export const showTaoHoaDonModal = createAction('SHOW_TAOHOADON_MODAL');
export const hideTaoHoaDonModal = createAction('HIDE_TAOHOADON_MODAL');

export const showTaoPhieuTraHangModal = createAction('SHOW_TAOPHIEUTRAHANG_MODAL');
export const hideTaoPhieuTraHangModal = createAction('HIDE_TAOPHIEUTRAHANG_MODAL');

export const showModal = createAction('SHOW_CREATE_MODAL');
export const hideModal = createAction('HIDE_CREATE_MODAL');
