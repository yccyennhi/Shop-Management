import { PhieuNhapModel } from "../models/PhieuNhapModel.js";
import { SanPhamModel } from "../models/SanPhamModel.js";

export const getPhieuNhaps = async (req, res) => {
  try {
    const PhieuNhaps = await PhieuNhapModel.find();
    console.log("PhieuNhaps", PhieuNhaps);
    res.status(200).json(PhieuNhaps);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createPhieuNhap = async (req, res) => {
  try {
    const newPhieuNhap = req.body;
    const { MaSP, SoLuong } = req.body;
    const PhieuNhap = new PhieuNhapModel(newPhieuNhap);
    await PhieuNhap.save();


    res.status(200).json(PhieuNhap);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
export const updatePhieuNhap = async (req, res) => {
  try {
    const updatePhieuNhap = req.body;
    console.log("update", updatePhieuNhap);
    const PhieuNhap = await PhieuNhapModel.findOneAndUpdate(
      { _id: updatePhieuNhap._id },
      updatePhieuNhap,
      { new: true }
    );
    res.status(200).json(PhieuNhap);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

export const deletePhieuNhap = async (req, res) => {
  try {
    const { id } = req.params;

    const PhieuNhap = await PhieuNhapModel.findByIdAndRemove(id);
    res.status(200).json(PhieuNhap);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};
