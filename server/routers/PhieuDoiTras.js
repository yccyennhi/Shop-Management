import express from "express";
import {
  getPhieuDoiTra,
  createPhieuDoiTra,
  updatePhieuDoiTra,
} from "../controllers/PhieuDoiTra.js";

const router = express.Router();
//http://localhost:5001/PhieuDouTras

router.get("/", getPhieuDoiTra);
router.post("/", createPhieuDoiTra);
router.post("/update", updatePhieuDoiTra);

export default router;
