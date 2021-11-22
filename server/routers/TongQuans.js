import express from "express";
import { getHoaDonsToday, getDoiTrasToday } from './../controllers/TongQuan.js';

const router = express.Router();
//http://localhost:5000/HoaDons

router.get("/", getHoaDonsToday);
router.get("/DoiTrasToday", getDoiTrasToday);

export default router;
