import express from "express";
import {
  getQLSanPhams,
} from "../controllers/QLSanPham.js";

const router = express.Router();
//http://localhost:5001/SanPhams

router.get("/", getQLSanPhams);

export default router;
