import { NhanVienModel } from "../models/NhanVienModel.js";

export const getNhanVien = async (req, res) => {
  try {
    const NhanViens = await NhanVienModel.find();

    res.status(200).json(NhanViens);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createNhanVien = async (req, res) => {
  try {
    const newNhanVien = req.body;

    const NhanVien = new NhanVienModel(newNhanVien);
    await NhanVien.save();
    res.status(200).json(NhanVien);
  } catch (err) {
    res.status(500).json({ error: err });
    next();
  }
};

export const updateNhanVien = async (req, res) => {
  try {
    const updateNhanVien = req.body;

    const NhanVien = await NhanVienModel.findOneAndUpdate(
      { _id: updateNhanVien._id },
      updateNhanVien,
      { new: true }
    );
    res.status(200).json(NhanVien);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
