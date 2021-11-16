import express from "express";
import {
  getPhieuHens,
  createPhieuHen,
  updatePhieuHen,
  deletePhieuHen
} from "../controllers/PhieuHen.js";

const router = express.Router();
//http://localhost:5001/PhieuHens

router.get("/", getPhieuHens);
router.post("/", createPhieuHen);
router.patch("/:id", updatePhieuHen);
router.delete("/:id", deletePhieuHen);

export default router;
