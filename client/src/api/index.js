import axios from "axios";

const URL = "http://localhost:5000";

//#region Khach hang
export const fetchKhachHangs = () => axios.get(`${URL}/KhachHangs`);

export const createKhachHang = (payload) =>
  axios.post(`${URL}/KhachHangs`, payload);

export const updateKhachHang = (payload) =>
  axios.patch(`${URL}/KhachHangs/${payload._id}`, payload);
//#endregion

//Khuyen mai
export const fetchKhuyenMais = () => axios.get(`${URL}/KhuyenMais`);

export const createKhuyenMai = (payload) =>
  axios.post(`${URL}/KhuyenMais`, payload);

export const updateKhuyenMai = (payload) =>
  axios.patch(`${URL}/KhuyenMais/${payload._id}`, payload);

export const deleteKhuyenMai = (id) => axios.delete(`${URL}/KhuyenMais/${id}`);

//#region Nhan vien
export const fetchNhanViens = () => axios.get(`${URL}/NhanViens`);

export const createNhanVien = (payload) =>
  axios.post(`${URL}/NhanViens`, payload);

export const updateNhanVien = (payload) =>
  axios.patch(`${URL}/NhanViens/${payload._id}`, payload);
//#endregion

//Phieu Hen
export const fetchPhieuHens = () => axios.get(`${URL}/PhieuHens`);

export const createPhieuHen = (payload) =>
  axios.post(`${URL}/PhieuHens`, payload);

export const updatePhieuHen = (payload) =>
  axios.patch(`${URL}/PhieuHens/${payload._id}`, payload);

export const deletePhieuHen = (id) => axios.delete(`${URL}/PhieuHens/${id}`);
//
//Phieu Bao Hanh
export const fetchPhieuBaoHanhs = () => axios.get(`${URL}/PhieuBaoHanhs`);

export const createPhieuBaoHanh = (payload) =>
  axios.post(`${URL}/PhieuBaoHanhs`, payload);

export const updatePhieuBaoHanh = (payload) =>
  axios.patch(`${URL}/PhieuBaoHanhs/${payload._id}`, payload);

export const deletePhieuBaoHanh = (id) =>
  axios.delete(`${URL}/PhieuBaoHanhs/${id}`);
//

//San pham
export const fetchSanPhams = () => axios.get(`${URL}/SanPhams`);

export const createSanPham = (payload) =>
  axios.post(`${URL}/SanPhams`, payload);

export const updateSanPham = (payload) =>
  axios.patch(`${URL}/SanPhams/${payload._id}`, payload);

export const deleteSanPham = (id) => axios.delete(`${URL}/SanPhams/${id}`);

//Phieu nhap

export const fetchPhieuNhaps = () => axios.get(`${URL}/PhieuNhaps`);

export const createPhieuNhap = (payload) =>
  axios.post(`${URL}/PhieuNhaps`, payload);

export const updatePhieuNhap = (payload) =>
  axios.patch(`${URL}/PhieuNhaps/${payload._id}`, payload);

export const deletePhieuNhap = (id) => axios.delete(`${URL}/PhieuNhaps/${id}`);


//GiaoDich
export const fetchHoaDons = () => axios.get(`${URL}/HoaDons`);
export const fetchTraHangs = () => axios.get(`${URL}/PhieuDoiTras`);
export const fetchCTHDs = () => axios.get(`${URL}/CTHDs`);
export const fetchCTPDTs = () => axios.get(`${URL}/CTPDTs`);
export const createHoaDon = (payload) => axios.post(`${URL}/HoaDons`, payload);
export const createCTHD = (payload) => axios.post(`${URL}/CTHDs`, payload);
export const updateSLKM = (payload) =>   axios.patch(`${URL}/HoaDons/${payload._id}`, payload);
export const createPhieuDoiTra = (payload) => axios.post(`${URL}/PhieuDoiTras`, payload);
export const createCTPDT = (payload) => axios.post(`${URL}/CTPDTs`, payload);


//TongQuan
export const getHoaDonsToday = () => axios.get(`${URL}/TongQuans/HoaDonsToday`);
export const getDoiTrasToday = () => axios.get(`${URL}/TongQuans/DoiTrasToday`);
export const getRanking = () => axios.get(`${URL}/TongQuans/Ranking`);
export const getHighestSanPhamList = () => axios.get(`${URL}/TongQuans/SanPhanList`);

//BaoCao
export const getCuoiNgays = () => axios.get(`${URL}/CuoiNgays`);
export const getBCBanHangs = () => axios.get(`${URL}/BCBanHangs`);
export const getBCHangHoas = () => axios.get(`${URL}/BCHangHoas`);


//#region Tai khoan
export const fetchTaiKhoans = () => axios.get(`${URL}/TaiKhoans`);

export const createTaiKhoan = (payload) =>
  axios.post(`${URL}/TaiKhoans`, payload);

export const updateTaiKhoan = (payload) =>
  axios.patch(`${URL}/TaiKhoans/${payload._id}`, payload);
//#endregion
