import axios from "axios";

const URL = "http://localhost:5000";

export const fetchKhachHangs = () => axios.get(`${URL}/KhachHangs`);
export const fetchKhuyenMais = () => axios.get(`${URL}/KhuyenMais`);
export const fetchNhanViens = () => axios.get(`${URL}/NhanViens`);
export const fetchSanPhams = () => axios.get(`${URL}/SanPhams`);
export const fetchTaiKhoans = () => axios.get(`${URL}/TaiKhoans`);
export const TaoSanPham = (payload) => axios.post(`${URL}/SanPhams`, payload);
