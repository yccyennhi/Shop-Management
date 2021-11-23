import express from "express";
import { getHoaDonsToday, getDoiTrasToday, getRankingByDoanhThu} from './../controllers/TongQuan.js';

const router = express.Router();
//http://localhost:5000/HoaDons

router.get("/HoaDonsToday", getHoaDonsToday);
router.get("/DoiTrasToday", getDoiTrasToday);
router.get("/Ranking", getRankingByDoanhThu);
export default router;
