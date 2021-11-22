import axios from "axios";

const URL = "http://localhost:5000";

export const fetchKhachHangs = () => axios.get(`${URL}/KhachHangs`);
export const fetchKhuyenMais = () => axios.get(`${URL}/KhuyenMais`);
//Khuyen mai
export const createKhuyenMai = (payload) =>
  axios.post(`${URL}/KhuyenMais`, payload);

export const updateKhuyenMai = (payload) =>
  axios.patch(`${URL}/KhuyenMais/${payload._id}`, payload);
  
export const deleteKhuyenMai = (id) => axios.delete(`${URL}/KhuyenMais/${id}`);
//
//Phieu Hen
export const fetchPhieuHens = () => axios.get(`${URL}/PhieuBaoHanhs`);

export const createPhieuHen = (payload) =>
  axios.post(`${URL}/PhieuBaoHanhs`, payload);

export const updatePhieuHen = (payload) =>
  axios.patch(`${URL}/PhieuBaoHanhs/${payload._id}`, payload);

export const deletePhieuHen = (id) => axios.delete(`${URL}/PhieuBaoHanhs/${id}`);
//
//Phieu Bao Hanh
export const fetchPhieuBaoHanhs = () => axios.get(`${URL}/PhieuBaoHanhs`);

export const createPhieuBaoHanh = (payload) =>
  axios.post(`${URL}/PhieuBaoHanhs`, payload);

export const updatePhieuBaoHanh = (payload) =>
  axios.patch(`${URL}/PhieuBaoHanhs/${payload._id}`, payload);

export const deletePhieuBaoHanh = (id) => axios.delete(`${URL}/PhieuBaoHanhs/${id}`);
//

//San pham
export const fetchSanPhams = () => axios.get(`${URL}/SanPhams`);

export const createSanPham = (payload) =>
  axios.post(`${URL}/SanPhams`, payload);

export const updateSanPham = (payload) =>
  axios.patch(`${URL}/SanPhams/${payload._id}`, payload);

export const deleteSanPham = (id) => axios.delete(`${URL}/SanPhams/${id}`);
export const fetchNhanViens = ()=> axios.get(`${URL}/NhanViens`);
export const fetchTaiKhoans = ()=> axios.get(`${URL}/TaiKhoans`);

//GiaoDich
export const fetchHoaDons = ()=> axios.get(`${URL}/HoaDons`);
export const fetchTraHangs = () => axios.get(`${URL}/PhieuDoiTras`)
export const fetchCTHDs = () => axios.get(`${URL}/CTHDs`)
export const fetchCTPDTs = () => axios.get(`${URL}/CTPDTs`)

//TongQuan
export const getHoaDonsToday = () => axios.get(`${URL}/TongQuans`);