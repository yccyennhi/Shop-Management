import { CTHDModel } from "../models/CTHDModel.js";
import { SanPhamModel } from "../models/SanPhamModel.js";
export const getCTHDs = async (req, res) => {
  try {
    const CTHDs = await CTHDModel.find();
    res.status(200).json(CTHDs);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createCTHD = async (req, res) => {
  try {
    const newCTHD = req.body;
    const CTHD = new CTHDModel(newCTHD);
    await CTHD.save();

    const SP = await SanPhamModel.findOne({_id: CTHD.idSP});
    SP.TonKho = SP.TonKho - CTHD.SoLuong;
    if (SP.SoLuong === 0 && SP.TrangThai === 'Đang kinh doanh') SP.TrangThai = 'Hết hàng';
    console.log(SP);
    const SanPham = await SanPhamModel.findOneAndUpdate(
      { _id: SP._id },
      SP,
      { new: true }
    );
    res.status(200).json(CTHD);
  } catch (err) {
    res.status(500).json({ error: err });
    console.log('failer');
  }
};

export const updateCTHD = async (req, res) => {
  try {
    const updateCTHD = req.body;
    const cthd = await CTHDModel.findOneAndUpdate(
      { _id: updateCTHD._id },
      updateCTHD,
      { new: true }
    );
    res.status(200).json(cthd);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
