import express from "express";
import { getCTHD, createCTHD, updateCTHD } from "../controllers/CTHD.js";

const router = express.Router();
//http://localhost:5000/CTHDs

router.get("/", getCTHD);
router.post("/", createCTHD);
router.post("/update", updateCTHD);

export default router;
