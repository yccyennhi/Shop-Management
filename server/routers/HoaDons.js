import express from "express";
import { getHoaDon, createHoaDon, updateHoadon } from "../controllers/HoaDon.js";

const router = express.Router();
//http://localhost:5000/HoaDons

router.get("/", getHoaDon);
router.post("/", createHoaDon);
router.post("/update", updateHoadon);

export default router;
