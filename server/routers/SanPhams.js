import express from "express";
import {
  getSanPhams,
  createSanPham,
  updateSanPham,
  deleteSanPham
} from "../controllers/SanPham.js";

const router = express.Router();
//http://localhost:5001/SanPhams

router.get("/", getSanPhams);
router.post("/", createSanPham);
router.patch("/:id", updateSanPham);
router.delete("/:id", deleteSanPham);

export default router;
