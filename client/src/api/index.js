import axios from "axios";

const URL = "http://localhost:5000";

export const fetchKhachHangs = () => axios.get(`${URL}/KhachHangs`);
export const fetchKhuyenMais = () => axios.get(`${URL}/KhuyenMais`);

export const createKhuyenMai = (payload) =>
  axios.post(`${URL}/KhuyenMais`, payload);

export const createSanPham = (payload) =>
  axios.post(`${URL}/SanPhams`, payload);

export const fetchNhanViens = () => axios.get(`${URL}/NhanViens`);
export const fetchSanPhams = () => axios.get(`${URL}/SanPhams`);
export const fetchTaiKhoans = ()=> axios.get(`${URL}/TaiKhoans`);
export const fetchHoaDons = ()=> axios.get(`${URL}/HoaDons`);
export const fetchTraHangs = () => axios.get(`${URL}/PhieuDoiTras`)
