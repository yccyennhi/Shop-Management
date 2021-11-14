import express from "express";
import { getCTHD } from "../controllers/CTHD";
import { getCTPDT, createCTPDT, updateCTPDT } from "../controllers/CTPDT";

const router = express.Router();
//http://localhost:5000/CTPDTs

router.get("/", getCTPDT);
router.post("/", createCTPDT);
router.post("/update", updateCTPDT);

export default router;