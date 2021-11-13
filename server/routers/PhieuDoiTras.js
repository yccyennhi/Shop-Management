import express from "express";
import {
    getPhieuDoiTra,
    createPhieuDouTra,
    updatePhieuDouTra,
} from "../controllers/PhieuDouTra.js";

const router = express.Router();
//http://localhost:5001/PhieuDouTras

router.get("/", getPhieuDoiTra);
router.post("/", createPhieuDouTra);
router.post("/update", updatePhieuDouTra);

export default router;
