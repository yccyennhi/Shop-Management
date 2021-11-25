import express from "express";
import { getCuoiNgays, getBCBanHangs } from './../controllers/BaoCao.js';

const router = express.Router();
//http://localhost:5000/HoaDons

router.get("/CuoiNgays",getCuoiNgays );
router.get("/BCBanHangs", getBCBanHangs);
//router.get("/BCHangHoas", );
export default router;
