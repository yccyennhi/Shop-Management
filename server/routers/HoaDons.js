import express from "express";
import { getHoaDons, createHoaDon, updateHoadon } from "../controllers/HoaDon.js";

const router = express.Router();
//http://localhost:5000/HoaDons

router.get("/", getHoaDons);
router.post("/", createHoaDon);
router.post("/update", updateHoadon);

export default router;
