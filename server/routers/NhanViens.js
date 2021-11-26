import express from "express";
import {
  getNhanVien,
  createNhanVien,
  updateNhanVien,
} from "../controllers/NhanVien.js";

const router = express.Router();
//http://localhost:5000/NhanViens

router.get("/", getNhanVien);
router.post("/", createNhanVien);
router.patch("/:id", updateNhanVien);

export default router;
