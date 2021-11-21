import { QLSanPhamModel } from "../models/QLSanPhamModel.js";
import { SanPhamModel } from "../models/SanPhamModel.js";

export const getQLSanPhams = async (req, res) => {
  try {
    const QLSanPhams = await QLSanPhamModel.find();
    const QLSPDKD= await QLSanPhamsDangKinhDoanh();
    console.log("QLSanPhams", QLSanPhams);
    res.status(200).json(QLSanPhams);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const QLSanPhamsDangKinhDoanh = async (req, res) => {
  try {
    const SanPhams = await SanPhamModel.find({ TrangThai: "Đang kinh doanh" });
    const QLSanPham = await QLSanPhamModel.findOneAndUpdate(
        { _id: "6198f3ca64d6d6ddaadfbe4c" },
        {SanPhamDangKinhDoanh: SanPhams.length}
      );
    console.log("SanPhams", SanPhams);
    res.status(200).json(SanPhams);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

