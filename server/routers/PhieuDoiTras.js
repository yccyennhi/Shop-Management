import express from "express";
import {
  getPhieuDoiTras,
  createPhieuDoiTra,
  updatePhieuDoiTra,
} from "../controllers/PhieuDoiTra.js";

const router = express.Router();
//http://localhost:5001/PhieuDoiTras

router.get("/", getPhieuDoiTras);
router.post("/", createPhieuDoiTra);
router.post("/update", updatePhieuDoiTra);

export default router;
