import express from "express";
import {
  getKhachHang,
  createKhachHang,
  updateKhachHang,
} from "../controllers/KhachHang.js";

const router = express.Router();
//http://localhost:5000/KhachHangs

router.get("/", getKhachHang);
router.post("/", createKhachHang);
router.post("/update", updateKhachHang);

export default router;
