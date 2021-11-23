import express from "express";
import { getCTPDTs, createCTPDT, updateCTPDT } from "../controllers/CTPDT.js";

const router = express.Router();
//http://localhost:5000/CTPDTs

router.get("/", getCTPDTs);
router.post("/", createCTPDT);
router.post("/update", updateCTPDT);

export default router;