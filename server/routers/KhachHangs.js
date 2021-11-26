import express from "express";
import {
  createKhachHang,
  getKhachHang,
  updateKhachHang,
} from "../controllers/KhachHang.js";

const router = express.Router();
//http://localhost:5000/KhachHangs

router.get("/", getKhachHang);
router.post("/", createKhachHang);
router.patch("/:id", updateKhachHang);

export default router;
