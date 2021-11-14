import {createActions} from 'redux-actions';

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

export const getHoaDons = createActions({
    getHoaDonsRequest: undefined,
    getHoaDonsSuccess: (payload) => payload,
    getHoaDonsFailure: (err) => err,
});

export const getKhuyenMais = createActions({
    getKhuyenMaisRequest: undefined,
    getKhuyenMaisSuccess: (payload) => payload,
    getKhuyenMaisFailure: (err) => err,
});