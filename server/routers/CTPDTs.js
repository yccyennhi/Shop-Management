import express from "express";
import { getCTPDT, createCTPDT, updateCTPDT } from "../controllers/CTPDT.js";

const router = express.Router();
//http://localhost:5000/CTPDTs

router.get("/", getCTPDT);
router.post("/", createCTPDT);
router.post("/update", updateCTPDT);

export default router;