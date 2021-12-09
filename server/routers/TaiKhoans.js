import express from "express";
import {
  isTaiKhoanLoggedIn,
  login,
  getTaiKhoan,
  createTaiKhoan,
  updateTaiKhoan,
} from "../controllers/TaiKhoan.js";
import { verifyToken } from "../middleware/Auth.js";

const router = express.Router();
//http://localhost:5000/TaiKhoans

router.get("/Auth", verifyToken, isTaiKhoanLoggedIn);
router.post("/Auth", login);
router.get("/", getTaiKhoan);
router.post("/", createTaiKhoan);
router.patch("/:id", updateTaiKhoan);

export default router;
