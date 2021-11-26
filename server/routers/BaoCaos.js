import express from "express";
import { getCuoiNgays, getBCBanHangs,getBCHangHoas } from './../controllers/BaoCao.js';

const router = express.Router();
//http://localhost:5000/HoaDons

router.get("/CuoiNgays",getCuoiNgays );
router.get("/BCBanHangs", getBCBanHangs);
router.get("/BCHangHoas", getBCHangHoas);
export default router;
