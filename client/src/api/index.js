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
//San pham
export const createSanPham = (payload) =>
  axios.post(`${URL}/SanPhams`, payload);

export const updateSanPham = (payload) =>
  axios.patch(`${URL}/SanPhams/${payload._id}`, payload);

export const deleteSanPham = (id) => axios.delete(`${URL}/SanPhams/${id}`);
//
export const fetchNhanViens = () => axios.get(`${URL}/NhanViens`);
export const fetchSanPhams = () => axios.get(`${URL}/SanPhams`);
export const fetchTaiKhoans = () => axios.get(`${URL}/TaiKhoans`);
