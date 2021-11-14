import express from "express";
import {
  getTaiKhoan,
  createTaiKhoan,
  updateTaiKhoan,
} from "../controllers/TaiKhoan.js";

const router = express.Router();
//http://localhost:5000/TaiKhoans

router.get("/", getTaiKhoan);
router.post("/", createTaiKhoan);
router.post("/update", updateTaiKhoan);

export default router;