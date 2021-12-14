import { PhieuDoiTraModel } from "../models/PhieuDoiTraModel.js";
import { SanPhamModel } from "../models/SanPhamModel.js";
import { KhachHangModel } from "../models/KhachHangModel.js";
import moment from "moment";

export const getPhieuDoiTras = async (req, res) => {
  try {
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
      await SanPhamModel.findOneAndUpdate({ _id: SP._id }, SP, {
        new: true,
      });
    });
    console.log(PhieuDoiTra);
    if (PhieuDoiTra.MaKH != "KH0000000") {
      const KhachHang = await KhachHangModel.findOne({ _id: PhieuDoiTra.idKH });
      KhachHang.DiemTichLuy -= parseInt(PhieuDoiTra.ThanhTien / 100);
      await KhachHangModel.findOneAndUpdate({ _id: KhachHang._id }, KhachHang, {
        new: true,
      });
    }

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
