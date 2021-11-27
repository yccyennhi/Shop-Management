import express from "express";
import { getHoaDons, createHoaDon, updateHoaDon, updateSLKM } from "../controllers/HoaDon.js";

const router = express.Router();
//http://localhost:5000/HoaDons

router.get("/", getHoaDons);
router.post("/", createHoaDon);
router.post("/update", updateHoaDon);
router.patch("/:id", updateSLKM)
export default router;
