import express from "express";
import {
  getSanPhams,
  createSanPham,
  updateSanPham,
} from "../controllers/SanPham.js";

const router = express.Router();
//http://localhost:5001/SanPhams

router.get("/", getSanPhams);
router.post("/", createSanPham);
router.post("/update", updateSanPham);

export default router;
