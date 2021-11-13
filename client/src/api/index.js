import axios from "axios";


const URL = 'http://localhost:5000';

export const fetchSanPhams = () => axios.get(`${URL}/SanPhams`);
export const fetchKhuyenMais = ()=> axios.get(`${URL}/KhuyenMais`)