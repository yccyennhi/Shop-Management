import { PhieuDoiTraModel } from "../models/PhieuDoiTraModel.js";
import {SanPhamModel} from "../models/SanPhamModel.js"
import moment from "moment";

export const getPhieuDoiTras = async (req, res) => {
  try {
    // const newPhieuDoiTra = new PhieuDoiTraModel({
    //   MaPDT: 'DT001',
    //   idHD: '619b037675c410c00a58b1d6',
    //   MaHD: 'HD006',
    //   idNV: '618f87add7f3f02b3fe340d5',
    //   MaNV: 'NV001',
    //   SoLuong: 2,
    //   ThoiGian: moment(),
    //   TongTien: 500000,
    // })

    // await newPhieuDoiTra.save();
    const PhieuDoiTras = await PhieuDoiTraModel.find();
    console.log("PhieuDoiTras", PhieuDoiTras);
    res.status(200).json(PhieuDoiTras);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createPhieuDoiTra = async (req, res) => {
  try {
    const newPhieuDoiTra = req.body;

    const PhieuDoiTra = new PhieuDoiTraModel(newPhieuDoiTra);
    await PhieuDoiTra.save();

    PhieuDoiTra.CTPDT.map(async (CTPDT) => {
      const SP = await SanPhamModel.findOne({ _id: CTPDT.idSP });
      SP.TonKho = SP.TonKho + CTPDT.SoLuong;
      if (SP.TrangThai === "Hết hàng") SP.TrangThai = "Đang kinh doanh";
      const SanPham = await SanPhamModel.findOneAndUpdate({ _id: SP._id }, SP, {
        new: true,
      });
    });
    res.status(200).json(PhieuDoiTra);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updatePhieuDoiTra = async (req, res) => {
  try {
    const updatePhieuDoiTra = req.body;
    const phieudoitra = await PhieuDoiTraModel.findOneAndUpdate(
      { _id: updatePhieuDoiTra._id },
      updatePhieuDoiTra,
      { new: true }
    );
    res.status(200).json(phieudoitra);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
