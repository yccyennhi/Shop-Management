import express from "express";
import { getHoaDonsToday, getDoiTrasToday, getRankingByDoanhThu, getHighestSanPhamList} from './../controllers/TongQuan.js';

const router = express.Router();
//http://localhost:5000/HoaDons

router.get("/HoaDonsToday", getHoaDonsToday);
router.get("/DoiTrasToday", getDoiTrasToday);
router.get("/Ranking", getRankingByDoanhThu);
router.get("/SanPhanList", getHighestSanPhamList);
export default router;
