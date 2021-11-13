import express from "express";
import {
  getKhuyenMais,
  createKhuyenMai,
  updateKhuyenMai,
} from "../controllers/KhuyenMai";

const router = express.Router();
//http://localhost:500/KhuyenMai

router.get("/",getKhuyenMais);
router.post("/create", createKhuyenMai);
router.post("/update", updateKhuyenMai);

export default router;