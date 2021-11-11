import express from "express";
import {
  getSanPham,
  createSanPham,
  updateSanPham,
} from "../controllers/SanPham.js";

const router = express.Router();
//http://localhost:5001/SanPhams

router.get("/", getSanPham);
router.post("/", createSanPham);
router.post("/update", updateSanPham);

export default router;
