import express from "express";

import {
  getKhuyenMais,
  createKhuyenMai,
  updateKhuyenMai,
  deleteKhuyenMai
} from "../controllers/KhuyenMai.js";

const router = express.Router();
//http://localhost:500-/KhuyenMais

router.get("/", getKhuyenMais);
router.post("/", createKhuyenMai);
router.patch("/:id", updateKhuyenMai);
router.delete("/:id", deleteKhuyenMai);

export default router;