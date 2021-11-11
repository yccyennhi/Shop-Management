import axios from "axios";


const URL = 'http://localhost:5000';

export const fetchSanPhams = () => axios.get(`${URL}/SanPhams`);
