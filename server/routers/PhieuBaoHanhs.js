import express from "express";
import {
  getPhieuBaoHanhs,
  createPhieuBaoHanh,
  updatePhieuBaoHanh,
  deletePhieuBaoHanh
} from "../controllers/PhieuBaoHanh.js";

const router = express.Router();
//http://localhost:5001/PhieuBaoHanhs

router.get("/", getPhieuBaoHanhs);
router.post("/", createPhieuBaoHanh);
router.patch("/:id", updatePhieuBaoHanh);
router.delete("/:id", deletePhieuBaoHanh);

export default router;
