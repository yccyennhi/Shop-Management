import express from "express";
import {
  getPhieuNhaps,
  createPhieuNhap,
  updatePhieuNhap,
  deletePhieuNhap
} from "../controllers/PhieuNhap.js";

const router = express.Router();
//http://localhost:5001/PhieuNhaps

router.get("/", getPhieuNhaps);
router.post("/", createPhieuNhap);
router.patch("/:id", updatePhieuNhap);
router.delete("/:id", deletePhieuNhap);

export default router;
